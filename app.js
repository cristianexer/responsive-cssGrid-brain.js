
$.fn.gridTemplateColumns = function () {
    return this[0].style.gridTemplateColumns;
}
$.fn.setGridTemplateColumns = function (val) {
     this[0].style.gridTemplateColumns = "repeat("+val+",1fr)";
}

let width = $(window).width(); 
let height = $(window).height();
let post = $('.posts').gridTemplateColumns().split(' ').length;
let trainingData = [];
const net = new brain.NeuralNetwork(); // instance of Neural Netork

$('#size').text('dataFormat(' + height + ', ' + width + ', ' + post+'),');
//add to #size current value of screen in specific format


function scale(value) {
    if (value > 999) return value / 10000;
    else if (value > 99) return value / 100;
    else return value / 1000;
} //scale valuees for better results


function dataFormat(h, w, output) {
    let dataform = {
        input: {
            h: scale(h),
            w: scale(w),
        },
        output: {
        }
    };
    dataform.output[output] = 1;
    return dataform;
}; //return specific format to be easies pushed


trainingData.push(
    //push data to data set
    //height, width, value for repeat
    dataFormat(710, 372, 1),
    dataFormat(710, 530, 2),
    dataFormat(710, 814, 3),
    dataFormat(710, 1106, 4),

);
net.train(trainingData);//train the network

  //activate the network for current window size
let first = brain.likely({
    h: scale(height),
    w: scale(width)
}, net); //activate network for listened window size
$('.posts').setGridTemplateColumns(first);

window.addEventListener('resize', (event) => {
    //listen window resize.
    let wid = event.target.document.documentElement.clientWidth; //width
    let hei = event.target.document.documentElement.clientHeight; //height
    let pos = $('.posts').gridTemplateColumns().split(' ').length;
    $('#size').text('dataFormat(' + hei + ', ' + wid + ', ' + pos + '),');
    //brain.likely(params); => key
    //net.run(params); => value
    let grid = brain.likely({
        h: scale(hei),
        w: scale(wid)
    }, net); //activate network for listened window size
    $('.posts').setGridTemplateColumns(grid); 

});

