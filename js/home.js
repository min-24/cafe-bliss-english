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





// 文字のfade-in-up
document.addEventListener("DOMContentLoaded", function() {
    const fadeInElements = document.querySelectorAll('.fade-in-up');
    
    const checkVisibility = () => {
        fadeInElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            
            // ビューポートに入ったとき
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                element.classList.add('active');  // スクロールでビューポートに入ったらアクティブにする
            } else {
                // 要素がビューポートから出たらアクティブを外す（スクロールで再度入るときに再発火）
                element.classList.remove('active');
            }
        });
    };

    // ページがスクロールされるたびにチェック
    window.addEventListener('scroll', checkVisibility);
    
    // 初回ロード時にもチェック
    checkVisibility();
});


// 画像のfade-in-front
// スクロール時に要素が画面内に入った時にクラスを追加
window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility); // ページ読み込み時にも確認

function checkVisibility() {
    const elements = document.querySelectorAll('.fade-in-front'); // すべてのfade-in-frontクラスを取得
    const windowHeight = window.innerHeight;

    elements.forEach(function(element) {
        const elementPosition = element.getBoundingClientRect().top;

        // 要素が画面内に入ったらfade-in-frontクラスを追加
        if (elementPosition < windowHeight * 0.8) {
            element.classList.add('visible');
        }
    });
}

// 最初にページが読み込まれた時にも確認しておく
checkVisibility();


// 動画を切り替える
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.video');
    let currentVideoIndex = 0;

    // 初めに1つ目のビデオを表示
    videos[currentVideoIndex].classList.add('active');

    function switchVideo() {
        // 現在のビデオを非表示にする
        videos[currentVideoIndex].classList.remove('active');
        
        // 次のビデオに切り替え
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;

        // 次のビデオを表示
        videos[currentVideoIndex].classList.add('active');
    }

    // 5秒ごとにビデオを切り替える
    setInterval(switchVideo, 5000); // 5000ms = 5秒
});


// 画像を切り替える

// document.addEventListener('DOMContentLoaded', function() {
//     const images = document.querySelectorAll('.image');
//     let currentImageIndex = 0;

//     // 初めに1つ目の画像を表示
//     images[currentImageIndex].classList.add('active');

//     function switchImage() {
//         // 現在の画像を非表示にする
//         images[currentImageIndex].classList.remove('active');
        
//         // 次の画像に切り替え
//         currentImageIndex = (currentImageIndex + 1) % images.length;

//         // 次の画像を表示
//         images[currentImageIndex].classList.add('active');
//     }

//     // 5秒ごとに画像を切り替える
//     setInterval(switchImage, 5000); // 5000ms = 5秒
// });


// 無限スクロール
document.addEventListener("DOMContentLoaded", function () {
    const marquee = document.getElementById("marquee");
    const marqueeWrapper = document.getElementById("marquee-wrapper");
    const speed = 0.7; // スクロール速度

    // コンテンツを無限スクロールするために複製する
    const clone = marquee.cloneNode(true);
    marqueeWrapper.appendChild(clone); // クローンを横に並べる

    function animate() {
        let currentX = parseFloat(getComputedStyle(marqueeWrapper).transform.split(",")[4]) || 0;

        // 左へスクロール
        marqueeWrapper.style.transform = `translateX(${currentX - speed}px)`;

        const contentWidth = marquee.scrollWidth; // 元のコンテンツの幅

        // もし元のコンテンツが完全に消えたらリセット
        if (Math.abs(currentX) >= contentWidth) {
            marqueeWrapper.style.transform = `translateX(0px)`; // リセット
        }

        requestAnimationFrame(animate);
    }

    animate();
});


// 画像スライドショー
document.addEventListener("DOMContentLoaded", function() {
    let index = 0;
    const slides = document.querySelectorAll(".slider img");
    const dots = document.querySelectorAll(".dot i"); // FontAwesome アイコンをターゲットに
    const totalSlides = slides.length;

     // 画像のスタイルを設定
     document.querySelectorAll('.slider img').forEach(function(img) {
        img.style.objectFit = 'cover';
        img.style.objectPosition = 'center center';
    });

    function updateSlide() {
        document.querySelector(".slider").style.transform = `translateX(${-100 * index}%)`;

        // すべてのドットをリセット（丸に戻す）
        dots.forEach(dot => {
            dot.classList.remove("fa-leaf");
            dot.classList.add("fa-circle");
            dot.style.fontSize = "8px";
            dot.style.color = "#A5D6A7"; // 緑に統一
        });

        // 現在のスライドのドットを葉っぱアイコンに変更
        dots[index].classList.remove("fa-circle");
        dots[index].classList.add("fa-leaf");
        dots[index].style.fontSize = "20px";
        dots[index].style.color = "#81C784"; // 濃い緑
    }

    // **最初のドットを手動でリーフにする（CSS だけではなく JS でも確実に適用）**
    dots[0].classList.remove("fa-circle");
    dots[0].classList.add("fa-leaf");
    dots[0].style.fontSize = "20px";
    dots[0].style.color = "#81C784"; // 濃い緑

    // ドットをクリックしたらスライド切り替え
    document.querySelectorAll(".dot").forEach((dot, dotIndex) => {
        dot.addEventListener("click", function() {
            index = dotIndex;
            updateSlide();
        });
    });

    // 3秒ごとに自動切り替え
    setInterval(() => {
        index = (index + 1) % totalSlides;
        updateSlide();
    }, 5000);
});






















