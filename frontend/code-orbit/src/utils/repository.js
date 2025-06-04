export function parseGitHubUrl(url) {
  try {
    const githubRegex = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = url.match(githubRegex);
    
    if (match && match.length >= 3) {
      let owner = match[1];
      let repo = match[2];
      
      repo = repo.split('.git')[0].split('/')[0];
      
      return { owner, repo };
    }
    
    return { owner: null, repo: null };
  } catch (error) {
    console.error('Error parsing GitHub URL:', error);
    return { owner: null, repo: null };
  }
}

export function convertToGraphData(nodes) {
  const links = [];
  
  nodes.forEach(node => {
    if (node.parent) {
      links.push({
        source: node.parent,
        target: node.id
      });
    }
  });
  
  const coloredNodes = nodes.map(node => ({
    ...node,
    color: node.group === 'folder' ? '#10b981' : '#4f46e5',
    size: node.group === 'folder' ? 8 : 5
  }));
  
  return { nodes: coloredNodes, links };
}

export function generateSampleStructure(repo) {
  return [
    { id: 'root', label: repo.name, group: 'folder' },
    { id: '1', label: 'src', group: 'folder', parent: 'root' },
    { id: '2', label: 'components', group: 'folder', parent: '1' },
    { id: '3', label: 'pages', group: 'folder', parent: '1' },
    { id: '4', label: 'utils', group: 'folder', parent: '1' },
    { id: '5', label: 'App.js', group: 'file', parent: '1' },
    { id: '6', label: 'index.js', group: 'file', parent: '1' },
    { id: '7', label: 'Button.js', group: 'file', parent: '2' },
    { id: '8', label: 'Card.js', group: 'file', parent: '2' },
    { id: '9', label: 'Navbar.js', group: 'file', parent: '2' },
    { id: '10', label: 'Home.js', group: 'file', parent: '3' },
    { id: '11', label: 'About.js', group: 'file', parent: '3' },
    { id: '12', label: 'helpers.js', group: 'file', parent: '4' },
    { id: '13', label: 'constants.js', group: 'file', parent: '4' },
    { id: '14', label: '.gitignore', group: 'file', parent: 'root' },
    { id: '15', label: 'package.json', group: 'file', parent: 'root' },
    { id: '16', label: 'README.md', group: 'file', parent: 'root' },
    { id: '17', label: 'assets', group: 'folder', parent: '1' },
    { id: '18', label: 'images', group: 'folder', parent: '17' },
    { id: '19', label: 'logo.svg', group: 'file', parent: '18' },
    { id: '20', label: 'hooks', group: 'folder', parent: '1' },
    { id: '21', label: 'useData.js', group: 'file', parent: '20' },
    { id: '22', label: 'api', group: 'folder', parent: '1' },
    { id: '23', label: 'client.js', group: 'file', parent: '22' },
  ];
}