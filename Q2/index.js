// 여기에 정답을 작성해주세요

class FakejQuery {
  constructor(query) {
    this.$collction = document.querySelector(query);
  }

  addClass(className) {
    this.$collction.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$collction.classList.remove(className);
    return this;
  }

  css(...style) {
    if (typeof style[0] === 'string') {
      const [key, value] = style;
      this.$collction.style[key] = value;
    } else if (typeof style[0] === 'object') {
      const [styleObj] = style;
      Object.entries(styleObj).forEach(([key, value]) => {
        console.log(key, value);
        this.$collction.style[key] = typeof value === 'number' ? `${value}px` : value;
      });
    }
    return this;
  }

  fadeOut(callback) {
    this.$collction.style['opacity'] = 1;
    const tick = () => {
      this.$collction.style['opacity'] -= 0.025;
      if (this.$collction.style['opacity'] > 0) {
        requestAnimationFrame(tick);
      } else {
        this.$collction.style['display'] = 'none';
        callback();
      }
    };
    tick();
    return this;
  }
}

const $ = (query) => new FakejQuery(query);

// 아래 코드는 수정하지 않습니다

// 1
$('#target-1').removeClass('border');

// 2
$('#target-1').css('left', '250px');

// 3
$('.target-2').removeClass('border').addClass('blue');

// 4
$('.target-2').css({ left: 50, 'margin-top': '-15px' });

// 5
$('#target-3').fadeOut(() => $('#target-4').addClass('green'));
