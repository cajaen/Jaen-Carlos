const CandidateModule = (function() {
    let candidates = [];
    
    function addCandidate(name, color) {
      candidates.push({ name, color, votes: 0 });
      renderCandidates();
      ChartModule.updateChart(candidates);
    }
    
    function removeCandidate(index) {
      candidates.splice(index, 1);
      renderCandidates();
      ChartModule.updateChart(candidates);
    }
  
    function voteCandidate(index) {
      candidates[index].votes++;
      renderCandidates();
      ChartModule.updateChart(candidates);
    }
    
    function getCandidates() {
      return candidates;
    }
  
    function renderCandidates() {
      const candidateList = document.getElementById('candidate-list');
      candidateList.innerHTML = '';
      candidates.forEach((candidate, index) => {
        const div = document.createElement('div');
        div.style.color = candidate.color;
        div.innerHTML = `${candidate.name} - Votos: ${candidate.votes}`;
        
        const voteButton = document.createElement('button');
        voteButton.textContent = 'Votar';
        voteButton.onclick = () => voteCandidate(index);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => removeCandidate(index);
        
        div.appendChild(voteButton);
        div.appendChild(deleteButton);
        candidateList.appendChild(div);
      });
    }
  
    return { addCandidate, removeCandidate, voteCandidate, getCandidates };
  })();
  
  const ChartModule = (function() {
    const ctx = document.getElementById('chart').getContext('2d');
    let chart;
  
    function updateChart(candidates) {
      const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
      
      const percentages = candidates.map(candidate => 
        totalVotes > 0 ? ((candidate.votes / totalVotes) * 100).toFixed(2) : 0
      );
      const labels = candidates.map(candidate => candidate.name);
      const backgroundColors = candidates.map(candidate => candidate.color);
  
      if (chart) chart.destroy();
      
      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Porcentaje de Votos (%)',
            data: percentages,
            backgroundColor: backgroundColors,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.parsed.y + '%';
                }
              }
            }
          }
        }
      });
    }
  
    return { updateChart };
  })();
  
  // Módulo principal para la aplicación
  const app = (function() {
    function addCandidate() {
      const name = document.getElementById('candidate-name').value;
      const color = document.getElementById('candidate-color').value;
      if (name) {
        CandidateModule.addCandidate(name, color);
        document.getElementById('candidate-name').value = '';
      }
    }
  
    return { addCandidate };
  })();
  
   
     
  
  