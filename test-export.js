const fs = require('fs');

async function fetchAndSaveHTML() {
  try {
    // Get list of proposals first
    const proposalsResponse = await fetch('http://localhost:3000/api/admin/template-proposals');
    const proposalsData = await proposalsResponse.json();
    
    if (!proposalsData.success || proposalsData.proposals.length === 0) {
      console.log('No proposals found');
      return;
    }
    
    const proposal = proposalsData.proposals.find(p => p.status === 'ANALYZED');
    if (!proposal) {
      console.log('No analyzed proposals found');
      return;
    }
    
    console.log(`Found proposal: ${proposal.id} for ${proposal.client.companyName}`);
    
    // Fetch HTML for all 3 options
    for (let option = 1; option <= 3; option++) {
      const url = `http://localhost:3000/api/export-proposal-preview?id=${proposal.id}&option=${option}`;
      console.log(`Fetching option ${option}...`);
      
      const response = await fetch(url);
      if (response.ok) {
        const html = await response.text();
        const filename = `template${option}.html`;
        fs.writeFileSync(filename, html);
        console.log(`✓ Saved ${filename} (${(html.length / 1024).toFixed(1)} KB)`);
      } else {
        console.error(`Failed to fetch option ${option}: ${response.status}`);
      }
    }
    
    console.log('\nDone! Open the HTML files to view the templates.');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchAndSaveHTML();