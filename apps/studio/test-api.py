#!/usr/bin/env python3
import urllib.request
import urllib.error
import json
import time

print("🧪 Test de l'API V3...")

# Attendre que le serveur compile
print("⏳ Attente de compilation du serveur...")
time.sleep(5)

# Tester d'abord le health check
try:
    print("\n1. Test du health check:")
    response = urllib.request.urlopen('http://localhost:3001/api/health')
    data = json.loads(response.read())
    print("✅ Health check OK:", data)
except Exception as e:
    print("❌ Erreur health check:", str(e))

# Tester l'API V3
try:
    print("\n2. Test de l'API V3:")
    response = urllib.request.urlopen('http://localhost:3001/api/test-v3')
    data = json.loads(response.read())
    
    if data.get('success'):
        print("✅ API V3 accessible")
        results = data.get('results', {})
        
        for blockId, info in results.items():
            print(f"\n{blockId}:")
            print(f"  - Trouvé: {'✅' if info['found'] else '❌'}")
            print(f"  - Render function: {'✅' if info['hasRenderFunction'] else '❌'}")
            print(f"  - Props: {info['hasProps']}")
            
            if 'renderResult' in info:
                rr = info['renderResult']
                print(f"  - Rendu: {'✅' if rr['hasHtml'] else '❌'}")
                print(f"    HTML: {rr['htmlLength']} caractères")
                print(f"    CSS: {rr['cssLength']} caractères")
            elif 'renderError' in info:
                print(f"  - Erreur de rendu: {info['renderError']}")
    else:
        print("❌ Échec de l'API V3")
        
except urllib.error.HTTPError as e:
    print(f"❌ Erreur HTTP {e.code}: {e.reason}")
    try:
        error_data = json.loads(e.read())
        print("Détails:", error_data)
    except:
        pass
except Exception as e:
    print("❌ Erreur:", str(e))

# Test POST d'un bloc spécifique
try:
    print("\n3. Test du rendu Hero V3:")
    data = json.dumps({
        'blockType': 'hero-v3-perfect',
        'props': {
            'variant': 'gradient-wave',
            'title': 'Test API Hero',
            'subtitle': 'Sous-titre de test'
        }
    }).encode('utf-8')
    
    req = urllib.request.Request(
        'http://localhost:3001/api/test-v3',
        data=data,
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    
    response = urllib.request.urlopen(req)
    result = json.loads(response.read())
    
    if result.get('success'):
        print("✅ Rendu Hero V3 réussi")
        print(f"  - Type: {result['result']['type']}")
        print(f"  - HTML: {'✅' if result['result']['hasHtml'] else '❌'}")
        print(f"  - CSS: {'✅' if result['result']['hasCss'] else '❌'}")
    else:
        print("❌ Échec du rendu")
        
except Exception as e:
    print("❌ Erreur POST:", str(e))