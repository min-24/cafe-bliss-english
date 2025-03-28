// ハンバーガーメニューを開く
document.getElementById("menu-button").addEventListener("click", function() {
    const menu = document.getElementById("nav-menu");
    const wave = document.querySelector(".humburger-wave-svg"); // 波のSVG

    if (!menu.classList.contains("active")) {
        menu.style.display = "flex"; // メニューを表示
        setTimeout(() => menu.classList.add("active"), 10); // メニューアニメーション

        // 波の表示
        setTimeout(() => {
            wave.style.opacity = 1; // 波を表示
        }, 10);
    } else {
        menu.classList.remove("active");
        setTimeout(() => {
            menu.style.display = "none"; // メニューを非表示
            wave.style.opacity = 0; // 波を非表示
        }, 500); // アニメーション終了後に波を非表示
    }

    // メニュー内のリンクアニメーション
    document.querySelectorAll(".nav-menu a").forEach((item, index) => {
        item.style.animation = menu.classList.contains("active") 
            ? `waveFadeIn 0.5s ease-out forwards ${0.1 * (index + 1)}s`
            : "none";
    });
});

// 閉じるボタン
document.getElementById("close-menu").addEventListener("click", function() {
    const menu = document.getElementById("nav-menu");
    const wave = document.querySelector(".humburger-wave-svg"); // 波のSVG

    menu.classList.remove("active");
    setTimeout(() => {
        menu.style.display = "none"; // メニューを非表示
        wave.style.opacity = 0; // 波を非表示
    }, 500); // アニメ終了後に波を非表示
});

// リンクをクリックした際にメニューを閉じる
document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", function() {
        // メニューを閉じる
        const menu = document.getElementById("nav-menu");
        const wave = document.querySelector(".humburger-wave-svg");
        
        menu.classList.remove("active");
        setTimeout(() => {
            menu.style.display = "none"; // メニューを非表示
            wave.style.opacity = 0; // 波を非表示
        }, 500); // アニメーション終了後に波を非表示

        // リンクのセクションにスクロール
        const targetId = this.getAttribute("href").substring(1); // #menu のような形式からIDを取得
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50, // 50px のオフセットを設定（必要なら調整）
                behavior: 'smooth'
            });
        }
    });
});


// 文字を回転させる
document.addEventListener("DOMContentLoaded", function () {
    const text = "Cafe Bliss Original Menu"; // 円形にする文字
    const circle = document.querySelector(".circle-text");

    circle.innerHTML = ""; // 初期化

    for (let i = 0; i < text.length; i++) {
        let span = document.createElement("span");
        span.innerText = text[i];
        let angle = (360 / text.length) * i; // 文字を均等配置

        span.style.position = "absolute";
        span.style.transformOrigin = "50% 50%"; // 回転の基準を中央に変更
        span.style.transform = `rotate(${angle}deg) translateY(-100px)`; // 文字を外側に配置しながら回転

        circle.appendChild(span);
    }
});


// 画像がスーと出てくる
document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu-item");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");  // 視界に入ったら 'show' クラスを追加
            } else {
                entry.target.classList.remove("show");  // 視界から外れたら 'show' クラスを削除
            }
        });
    }, { threshold: 0.2 });

    menuItems.forEach(item => observer.observe(item));  // 各メニューアイテムを監視
});



//fade-in-up
document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in-up");
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active"); // 画面外に出たらリセット
        }
      });
    }, { threshold: 0.1 }); // しきい値を下げて、少し見えたら発動
  
    fadeElements.forEach(element => {
      observer.observe(element);
    });
  });



