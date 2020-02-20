$(function () {
    $("#log-out-div").on( "click",function () {
        alert("登出成功");
        window.location = "./login.html";
    });

    //  点击这个类，就会更换背景图片
    $('.click-div').on('click', function () {
        changeBackGround();
    });

    //  等原图加载完，再移除模糊滤镜
    $('.wallpaper').on('load',function () {
        if ($(this).attr('src') === $(this).attr('data-src')) {
            $(this)[0].classList.remove('blur');   //移除高斯模糊class，JQuery写法，当知道只会有一个结果返回时，$(this)[0]等价于this
            //  this.classList.remove('blur');   //移除高斯模糊class，DOM写法
        }
    });

    // 懒加载图片
    ObserverLazyLoadImages();

});

window.onload=loadImg;  //加载好页面再加载图片
window.onload=loadVideo;    //加载完页面再加载视频

//  加载左侧浮动栏的图片
function loadImg() {
    $('.float-icon').each(function () {
        const node = $(this);
        node.attr('src', node.attr('data-src'));
    });
};

//  加载视频
function loadVideo(){
    $('#pokemon-op source').attr('src', $('#pokemon-op source').attr('data-src'));  //  设置src
    $('#pokemon-op')[0].load(); //  重新加载视频
}

//  切换背景图，同时切换背景颜色
function changeBackGround() {
    //  壁纸列表
    const background_array = ["../img/background/Eon-Pokemon.png",
                            "../img/background/Mythical-Pokemon.png",
                            "../img/background/Swords-Of-Justice.png",
                            "../img/background/Legendary-Birds.png"];
    //  每张壁纸对应的背景颜色
    const background_color = ['bedce8', 'b0b6c2', '5d8d86', 'DFF4FC'];
    // const background_color = [0xbedce8, 0xb0b6c2, 0x5d8d86, 0xDFF4FC];
    const key = Math.floor(Math.random() * background_array.length);
    $('body').css("background-color", "#" + background_color[key]); //  先改背景颜色
    $('body').css('background-image', 'url('+ background_array[key] + ')'); //  再改背景图片

}

//  图片进入到视野中才开始加载图片
function ObserverLazyLoadImages () {
    let images = document.querySelectorAll(".wallpaper");
    let observer = new IntersectionObserver(entries => {
            entries.forEach(item => {
                if (item.isIntersecting) {
                    item.target.src = item.target.dataset.src; // 开始加载图片,把data-src的值放到src
                    //item.target.classList.remove('blur');   //移除高斯模糊class，如果在这里去掉的话，原图还没加载完就会去掉模糊
                    observer.unobserve(item.target); // 停止监听已开始加载的图片
                }
            });
        },
        {
            rootMargin: "0px 0px -150px 0px" // 交叉过视图的150，才开始派发事件
        }
    );
    images.forEach(item => observer.observe(item));
}

