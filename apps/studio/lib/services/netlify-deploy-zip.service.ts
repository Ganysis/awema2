import { NetlifyAPI } from '@netlify/api';
import archiver from 'archiver';
import { Readable } from 'stream';

export class NetlifyDeployZipService {
  private netlifyClient: NetlifyAPI;

  constructor(token: string) {
    this.netlifyClient = new NetlifyAPI(token);
  }

  async deployWithZip(
    files: Record<string, string>,
    siteId: string,
    onProgress?: (message: string) => void
  ): Promise<{ deployId: string; url: string }> {
    try {
      onProgress?.('Création de l\'archive ZIP...');
      
      // Créer un buffer pour le ZIP
      const chunks: Buffer[] = [];
      const archive = archiver('zip', { zlib: { level: 9 } });
      
      // Collecter les données dans un buffer
      archive.on('data', (chunk) => chunks.push(chunk));
      
      // Ajouter tous les fichiers
      for (const [path, content] of Object.entries(files)) {
        archive.append(content, { name: path });
      }
      
      // Finaliser l'archive
      await archive.finalize();
      
      // Attendre que toutes les données soient collectées
      await new Promise((resolve) => archive.on('end', resolve));
      
      const zipBuffer = Buffer.concat(chunks);
      onProgress?.(`Archive créée: ${(zipBuffer.length / 1024 / 1024).toFixed(2)} MB`);
      
      // Créer le déploiement
      onProgress?.('Création du déploiement...');
      const deploy = await this.netlifyClient.createSiteDeploy({
        siteId,
        body: {
          draft: false
        }
      });
      
      // Upload le ZIP
      onProgress?.('Upload des fichiers...');
      await this.netlifyClient.uploadDeployFile({
        deployId: deploy.id!,
        path: '/',
        body: zipBuffer,
        size: zipBuffer.length
      });
      
      // Attendre la fin du déploiement
      onProgress?.('Finalisation...');
      let status = await this.netlifyClient.getSiteDeploy({
        siteId,
        deployId: deploy.id!
      });
      
      while (status.state === 'uploading' || status.state === 'processing') {
        await new Promise(resolve => setTimeout(resolve, 2000));
        status = await this.netlifyClient.getSiteDeploy({
          siteId,
          deployId: deploy.id!
        });
      }
      
      if (status.state !== 'ready') {
        throw new Error(`Déploiement échoué: ${status.error_message || 'Erreur inconnue'}`);
      }
      
      return {
        deployId: deploy.id!,
        url: status.ssl_url || status.url || ''
      };
      
    } catch (error: any) {
      console.error('[Netlify ZIP Deploy] Erreur:', error);
      throw error;
    }
  }
}