var brainResize = function(element){
    const net = new brain.NeuralNetwork();
    var obj = {};
    obj.element = element;
    obj.words = 0;
    obj.dataset = [];
    obj.windowWidth = document.documentElement.clientWidth;
    obj.windowHeigh = document.documentElement.clientHeight;
    obj.sizes = {
        xs: "0.8rem",
        sm: "1rem",
        md: "1.3rem",
        lg: "1.7rem",
        xl: "2rem",
    };
    obj.obj.scale = function(value) {
        if (value > 999) return value / 10000;
        else if (value > 99) return value / 100;
        else return value / 1000;
    };
    obj.watch = function(){
        if(dataset.length == 0)
            obj.defaultDataset();
        net.train(obj.dataset);
        window.addEventListener('resize', (event) => {

            let wid = event.target.document.documentElement.clientWidth;
            let hei = event.target.document.documentElement.clientHeight;
            let fontSize = brain.likely({
                h: obj.scale(hei),
                w: obj.scale(wid),
                words: obj.scale(67)
            },net);

            element.css('font-size', obj.sizes[fontSize] );

        });
    }
    obj.wordCount = function() {
        obj.words = element.text().split(" ").length;
    }
    obj.loadDataset = function(dataset){
        obj.dataset.push(dataset);
    }

    obj.defaultDataset = function(){
        obj.dataset.push({
            input: {
                h: obj.scale(1200),
                w: obj.scale(1600),
                words: obj.scale(67)
            },
            output: {
                xl: 2
            }
        }, {
                input: {
                    h: obj.scale(900),
                    w: obj.scale(1400),
                    words: obj.scale(67)
                },
                output: {
                    lg: 1
                }
            }, {
                input: {
                    h: obj.scale(700),
                    w: obj.scale(900),
                    words: obj.scale(67)
                },
                output: {
                    md: 0.5
                }
            }, {
                input: {
                    h: obj.scale(300),
                    w: obj.scale(600),
                    words: obj.scale(67)
                },
                output: {
                    sm: 0.3
                }
            }, {
                input: {
                    h: obj.scale(100),
                    w: obj.scale(300),
                    words: obj.scale(67)
                },
                output: {
                    xs: 0.1
                }
            });
    }
    return obj;
}

var x = new brainResize($('#p'));
x.watch();