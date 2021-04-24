import Node from '../lib/Node.js'
import { Sprite } from '../lib/Sprite.js';
import { Label } from '../lib/Label.js'
import { cardFlipAnimate, cardZoomOutAnimate } from '../engine/Animate.js'
var listClick = [];
var parentNode = [];
var score = 10000
var matched = 0;
export class Card extends Node {
    constructor(src, index, value) {
        super()
        this._src = ''
        if (src) this.src = src
        this._index = '';
        this._value = '';
        if (index) this.index = index
        if (value) this.value = value
        this._width = 50;
        this._height = 50;
        this._initImage(src)
        this._initCover(index)
    }
    get src() {
        return this._src
    }
    set src(val) {
        this._src = val
    }
    get index() {
        return this._index
    }
    set index(val) {
        this._index = val
    }
    get value() {
        return this._index
    }
    set value(val) {
        this._value = val
        this.ele.value = val
    }

    // _initElement(src = this.src, index = this.index) {
    //     console.log("init: " + src)
    //     this._initImage(src);
    //     this._initCover(index);
    // }
    _initCover(index) {
        var cover = new Node()
        cover.background = './img/cover.jpg';
        cover.width = 150;
        cover.height = 150;
        // cover.border='5px solid gray'
        this.addChild(cover);
        //cover.on("mousedown", () => this.onClickCard(cover));
        var label = new Label(this.index)
        label.text = index;
        label.fontColor = 'white'
        label.fontSize = 30
        label.x = cover.width / 2 - 10;
        label.y = cover.width / 2 - 10;
        cover.addChild(label)
    }
    _initImage(src) {
        var img = new Sprite(src)
        img.width = 150;
        img.height = 150;
        img.scaleX = 0;
        this.addChild(img);
    }
    setScore(val) {
        var obj = {
            value: score
        }
        TweenLite.to(obj, 0.4, {
            value: val,
            roundProps: {
                value: 20,
            },
            onUpdate: () => {
                document.getElementById('score').innerHTML = obj.value
                score = obj.value
            },
            onComplete: () => {
                if (matched == 10) {
                    alert('You win');
                } else if (val <= 0) {
                    alert('You lose');
                    ready = false
                }
            }
        })
    }
    // onClickCard(cover) {

    //     if (listClick.length >= 2 || cover.isClicked == 1) { return }
    //     cardFlipAnimate(cover, this.ele.children[0])
    //     parentNode.push(this);
    //     listClick.push(cover);
    //     cover.isClicked = 1;
    //     if (parentNode.length == 2) {
    //         ready = false
    //         if (parentNode[0]._value === parentNode[1]._value) {
    //             cardZoomOutAnimate(parentNode[0].ele.children[0]);
    //             cardZoomOutAnimate(parentNode[1].ele.children[0]);
    //             setTimeout(() => {
    //                 parentNode[0].active = false;
    //                 parentNode[1].active = false;
    //                 parentNode = []; listClick = [];
    //                 matched++;
    //                 ready = true
    //                 console.log('ready')
    //                 this.setScore(score + 1000)
    //             }, 2500);
    //         } else {
    //             setTimeout(() => {
    //                 cardFlipAnimate(parentNode[0].ele.children[0], listClick[0])
    //                 cardFlipAnimate(parentNode[1].ele.children[0], listClick[1], () => {
    //                     parentNode = []; listClick = []
    //                     this.setScore(score - 500)
    //                     console.log('ready')
    //                     ready = true
    //                 })
    //             }, 1000)
    //         }
    //     }
    // }
}