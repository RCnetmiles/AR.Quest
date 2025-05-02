let score = 0;

AFRAME.registerComponent('player-move', {
  init: function () {
    const player = this.el;
    const coin = document.querySelector('#coin');
    const scoreText = document.querySelector('#score');

    window.addEventListener('click', () => {
      const pos = player.object3D.position;
      pos.z -= 0.3; // Caminha para frente
      player.setAttribute('position', pos);

      const distance = player.object3D.position.distanceTo(coin.object3D.position);
      if (distance < 0.5) {
        score += 10;
        scoreText.setAttribute('value', `Pts: ${score}`);
      }
    });
  }
});
