(function () {
  const wheel = document.querySelector('.mainbox');
  const startButton = document.querySelector('.spin');
  let deg = 0;

  startButton.addEventListener('click', startSpinning);
  wheel.addEventListener('transitionend', showPrize);

  let bet = document.getElementById('bet');
  let bonusBox = document.querySelector('.bonus_value');
  let sectors = Array.from(document.querySelectorAll('span'));
  let selectMenu = document.querySelector('.bet');

  selectMenu.addEventListener('input', (event) => {
    if (event.target.value == 2) {
      sectors[15].style.display = 'block';
      sectors[14].style.display = 'block';
      for (let i = 0; i < 16; i++) {
        sectors[i].classList.remove('small');
        sectors[i].classList.remove(`small${i + 1}`);
        sectors[i].classList.add('medium');
        sectors[i].classList.add(`medium${i + 1}`);
      }
    } else if (event.target.value == 1) {
      sectors[15].style.display = 'none';
      sectors[14].style.display = 'none';
      for (let i = 0; i < 16; i++) {
        sectors[i].classList.remove('medium');
        sectors[i].classList.remove(`medium${i + 1}`);
        sectors[i].classList.add('small');
        sectors[i].classList.add(`small${i + 1}`);
      }
    }
  });

  let total = 0;
  let counter = 10;
  let specialAngle;
  let secondSpecialAngle;

  function startSpinning() {

    if (bet.value < 1) {
      bonusBox.innerHTML = 'choose you bet!'

      setTimeout(() => {
        bonusBox.innerHTML = '';
        return;
      }, 3000);

    } else {

      counterCheck();
  
      startButton.style.pointerEvents = 'none';
      wheel.style.transition = 'all 5s ease-out';
      wheel.style.transform = `rotate(${deg}deg)`;
      wheel.classList.add('blur');
      --counter;
    }
    
  }

  function counterCheck() {
    if (counter < 1) {
      counter = 10;
      specialAngle = 0;
      secondSpecialAngle = 0;
    }

    if (counter % 3 === 0 && counter !== 9) {
      deg = specialAngle;
    } else if (counter % 4 === 0 && counter !== 8) {
      deg = secondSpecialAngle;
    } else {
      deg = Math.floor(5000 + Math.random() * 5000);
    }

    if (counter === 9) {
      specialAngle = deg;
    } else if (counter === 8) {
      secondSpecialAngle = deg;
    }

  }

  function calcBonus() {
    let angle = deg - (Math.floor(deg / 360) * 360);

    if (bet.value == 2) {

      if (angle <= 33.5 && angle >= 11) {
        bonus = 1000;
      } else if (angle <= 56 && angle >= 33.5) {
        bonus = 200;
      } else if (angle <= 78.6 && angle >= 56.1) {
        bonus = 300;
      } else if (angle <= 101.2 && angle >= 78.7) {
        bonus = 150;
      } else if (angle <= 123.8 && angle >= 101.3) {
        bonus = 400;
      } else if (angle <= 146.4 && angle >= 123.9) {
        bonus = 1600;
      } else if (angle <= 169 && angle >= 146.5) {
        bonus = 800;
      } else if (angle <= 191.6 && angle >= 169.1) {
        bonus = 500;
      } else if (angle <= 214.2 && angle >= 191.7) {
        bonus = 350;
      } else if (angle <= 236.8 && angle >= 214.3) {
        bonus = 1100;
      } else if (angle <= 259.4 && angle >= 236.9) {
        bonus = 1200;
      } else if (angle <= 282 && angle >= 259.5) {
        bonus = 1500;
      } else if (angle <= 304.6 && angle >= 282.1) {
        bonus = 1800;
      } else if (angle <= 327.2 && angle >= 304.7) {
        bonus = 400;
      } else if (angle <= 349.8 && angle >= 327.3) {
        bonusBox.innerHTML = 'you won 3 free spins!';
        activateFreeSpins();
      } else {
        bonus = 100;
      }

    } else if (bet.value == 1) {

      if (angle >= 23 && angle <= 48.8) {
        bonus = 300;
      } else if (angle >= 48.9 && angle <= 74.7) {
        bonus = 150;
      } else if (angle >= 74.8 && angle <= 100.6) {
        bonus = 400;
      } else if (angle >= 100.7 && angle <= 126.8) {
        bonus = 1600;
      } else if (angle >= 126.9 && angle <= 152.9) {
        bonus = 800;
      } else if (angle >= 153 && angle <= 179) {
        bonus = 500;
      } else if (angle >= 179.1 && angle <= 205) {
        bonus = 350;
      } else if (angle >= 205.1 && angle <= 231.6) {
        bonus = 1100;
      } else if (angle >= 231.7 && angle <= 257.6) {
        bonus = 1200;
      } else if (angle >= 257.7 && angle <= 279.8) {
        bonus = 1500;
      } else if (angle >= 279.9 && angle <= 305.9) {
        bonusBox.innerHTML = 'you won 3 free spins!';
        activateFreeSpins();
      } else if (angle >= 306 && angle <= 332) {
        bonus = 100;
      } else if (angle >= 332.1 && angle <= 357.2) {
        bonus = 1000;
      } else {
        bonus = 200;
      }  
    }
    return bonus;
  }

  function showPrize() {
    wheel.classList.remove('blur');
    startButton.style.pointerEvents = 'auto';
    wheel.style.transition = 'none';
    const actualDeg = deg % 360;
    wheel.style.transform = `rotate(${actualDeg}deg)`;

    let bonus = 0;

    bonus = calcBonus();

    if (bonus !== 0) {
      bonusBox.innerHTML = bonus;
    }

    total += bonus;
    let totalValueContainer = document.querySelector('.total_value');
    totalValueContainer.innerHTML = `total: ${total}`;

  }

  function activateFreeSpins() {
    let count = 0;
    bonus = 0;
    let interval = setInterval(counter, 6000);

    function counter() {
      ++count;

      if (count > 3) {
        clearInterval(interval);
      } else {
        startSpinning();
      }
    }
  }


})();