
// Version simplifiée du CMS Core pour les tests
class CMSCore {
  constructor(data, apiEndpoint = 'http://localhost:3002/api/cms') {
    this.data = data;
    this.apiEndpoint = apiEndpoint;
    this.authToken = localStorage.getItem('cms_auth_token');
    console.log('CMS Core initialized with data:', data);
  }

  async login(email, password) {
    try {
      const response = await fetch(this.apiEndpoint + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const { token } = await response.json();
        this.authToken = token;
        localStorage.setItem('cms_auth_token', token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  logout() {
    this.authToken = null;
    localStorage.removeItem('cms_auth_token');
  }

  isAuthenticated() {
    return !!this.authToken;
  }

  async save() {
    if (!this.authToken) return false;

    try {
      const response = await fetch(this.apiEndpoint + '/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.authToken
        },
        body: JSON.stringify(this.data)
      });

      return response.ok;
    } catch (error) {
      console.error('Save error:', error);
      return false;
    }
  }
}

window.CMSCore = CMSCore;
