import React from 'react'


export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        var now = new Date();
        var hour = ("00" + now.getUTCHours()).slice(-2);
        var minute = ("00" + now.getUTCMinutes()).slice(-2);
        var percentOfTwoHours = 100+ (((hour % 2) + (minute / 60)) * 50 ) * (120/135);
        var hours = ("00" + (now.getHours())).slice(-2)
        var minutes = ("00" + (now.getMinutes())).slice(-2)
        this.state = {number: 1,hours,minutes,percentOfTwoHours};
    }

    componentDidMount() {
      this.interval = setInterval(() => {
        var now = new Date();
        var hour = ("00" + now.getUTCHours()).slice(-2);
        var minute = ("00" + now.getUTCMinutes()).slice(-2);
        var percentOfTwoHours = 100+ (((hour % 2) + (minute / 60)) * 50 ) * (120/135);
        var hours = ("00" + (now.getHours())).slice(-2)
        var minutes = ("00" + (now.getMinutes())).slice(-2)
        this.setState({
            hours,
            minutes,
            percentOfTwoHours,
        });
      }, 1000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }
    render(){
        const {number} = this.state
        var nd = {
            name: "昼夜交替",
            phases: [
                { duration:  25, bgcolor: "#1998B6", name: "夜晚" },
                { duration:  5, bgcolor: "linear-gradient( 90deg, #1998B6, #BFEFFF )", name: "破晓" },
                { duration:  70, bgcolor: "#BFEFFF", name: "白天" },
                { duration:  5, bgcolor: "linear-gradient( 90deg, #BFEFFF, #1998B6 )", name: "薄暮" },
                { duration:  15, bgcolor: "#1998B6", name: "夜晚" },
                { duration:  15, bgcolor: "rgba(25,152,182,0.3)", name: "夜晚", class: "future" }
            ]};
        var dt = {
            name: "干涸高地",
            phases: [
                { duration:  40, bgcolor: "#F8F2AD", name: "坠毁点" },
                { duration:  20, bgcolor: "#DED98A", name: "沙尘暴" },
                { duration:  40, bgcolor: "#F8F2AD", name: "坠毁点" },
                { duration:  20, bgcolor: "#DED98A", name: "沙尘暴" },
                { duration:  15, bgcolor: "rgba(248,242,173,0.3)", name: "坠毁点", class: "future" }
            ]};
        var vb = {
            name: "苍翠边界",
            phases: [
                { duration:  10, bgcolor: "#84C147", name: null },
                { duration:  20, bgcolor: "#6DAC2F", name: "夜晚Boss" },
                { duration:  75, bgcolor: "#C4E2A5", name: "白天" },
                { duration:  15, bgcolor: "#84C147", name: "夜晚" },
                { duration:  10, bgcolor: "rgba(132,193,71,0.3)", name: "夜晚", class: "future" },
                { duration:   5, bgcolor: "rgba(109,172,47,0.3)", name: null, class: "future" }
            ]};
        var ab = {
            name: "赤金盆地",
            phases: [
                { duration:  45, bgcolor: "#FFE37F", name: null },
                { duration:  15, bgcolor: "#FFD53D", name: "尊者挑战" },
                { duration:  20, bgcolor: "#EAB700", name: "八爪藤" ,see: null},
                { duration:  10, bgcolor: "#FFF1C1", name: "重置" },
                { duration:  30, bgcolor: "#FFE37F", name: "Pillars" },
                { duration:  15, bgcolor: "rgba(255,227,127,0.3)", name: "Pillars", class: "future" }
            ]};
        var td = {
            name: "缠藤深渊",
            phases: [
                { duration:  25, bgcolor: "#FFD7D7", name: null },
                { duration:   5, bgcolor: "#FFBDBD", name: "准备" },
                { duration:  20, bgcolor: "#F99", name: "查克虫王" ,see: null},
                { duration:  70, bgcolor: "#FFD7D7", name: "帮助前哨" },
                { duration:  15, bgcolor: "rgba( 255,215,215,0.3)", name: "帮助前哨", class: "future" }
            ]};
        var ds = {
            name: "巨龙阵地",
            phases: [
                { duration:  90, bgcolor: "linear-gradient( 90deg, #c8c5e5, #DFDDF7 )", name: null },
                { duration:  30, bgcolor: "linear-gradient( 90deg, #9f99cc, #c8c5e5 )", name: "墨德摩斯之口",see: null },
                { duration:  15, bgcolor: "linear-gradient(90deg, rgba(200,197,229,0.3), rgba(203,201,232,0.3))", name: null, class: "future" }
            ]};
        var mk = {
            name: "Lions Arch &nbsp; [ only during Halloween Events ]",
            phases: [
                { duration:  120, bgcolor: "linear-gradient( 90deg, #B98291, #F5F5F5 )", name: "Mad King" },
                { duration:  15, bgcolor: "linear-gradient(90deg, rgba( 185,130,145,0.3), rgba(192,143,157,0.3))", name: "Mad King", class: "future" }
            ]};

        var startHour = new Date();
        startHour = Math.floor(startHour.getUTCHours()/2)*2;
        switch (startHour) {
            case 0:
                var wb = {
                    name: "世界BOSS",
                    phases: [
                        { duration:  15, bgcolor: "#FF8550", name: "泰达·科文顿", chatlink: "[&BKgBAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "斯瓦尼亚萨满", chatlink: "[&BMIDAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "超能毁灭者", chatlink: "[&BM0CAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "火元素", chatlink: "[&BEcAAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "碎裂巨兽", chatlink: "[&BE4DAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "巨型丛林地虫", chatlink: "[&BEEFAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "莫迪尔沃尔格斯", chatlink: "[&BLAAAAA=]",see: null},
                        { duration:  15, bgcolor: "#FFA850", name: "暗影巨兽", chatlink: "[&BPcAAAA=]",see: null},
                        { duration:  15, bgcolor: "rgba(255,133,80,0.3)", name: "魔像马克II型", chatlink: "[&BNQCAAA=]",see: null ,class: "future" }
                    ]};
                var hwb = {
                    phases: [
                        { duration:  15, bgcolor: "#EA788F", name: "吞噬托", chatlink: "[&BNABAAA=]",see: null },
                        { duration:  45, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "#EA788F", name: "三重麻烦", chatlink: "[&BKoBAAA=]",see: null  },
                        { duration:  45, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "rgba(234,120,143,0.3)", name: "喀壳虫女王", chatlink: "[&BNUGAAA=]",see: null, class: "future" }
                    ]};
                break;

            case 2:
                var wb = {
                    name: "世界BOSS",
                    phases: [
                        { duration:  15, bgcolor: "#FF8550", name: "魔像马克II型", chatlink: "[&BNQCAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "斯瓦尼亚萨满", chatlink: "[&BMIDAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "卓玛之爪", chatlink: "[&BHoCAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "火元素", chatlink: "[&BEcAAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "泰达·科文顿", chatlink: "[&BKgBAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "巨型丛林地虫", chatlink: "[&BEEFAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "超能毁灭者", chatlink: "[&BM0CAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "暗影巨兽", chatlink: "[&BPcAAAA=]",see: null},
                        { duration:  15, bgcolor: "rgba(255,133,80,0.3)", name: "碎裂巨兽", chatlink: "[&BE4DAAA=]",see: null, class: "future" }
                    ]};
                var hwb = {
                    phases: [
                        { duration:  15, bgcolor: "#EA788F", name: "喀壳虫女王", chatlink: "[&BNUGAAA=]",see: null },
                        { duration:  45, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "#EA788F", name: "吞噬托", chatlink: "[&BNABAAA=]",see: null },
                        { duration:  45, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "rgba(234,120,143,0.3)", name: "三重麻烦", chatlink: "[&BKoBAAA=]",see: null , class: "future" }
                    ]};
                break;

            case 4:
                var wb = {
                    name: "世界BOSS",
                    phases: [
                        { duration:  15, bgcolor: "#FF8550", name: "碎裂巨兽", chatlink: "[&BE4DAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "斯瓦尼亚萨满", chatlink: "[&BMIDAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "莫迪尔沃尔格斯", chatlink: "[&BLAAAAA=]",see: null},
                        { duration:  15, bgcolor: "#FFA850", name: "火元素", chatlink: "[&BEcAAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "魔像马克II型", chatlink: "[&BNQCAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "巨型丛林地虫", chatlink: "[&BEEFAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "卓玛之爪", chatlink: "[&BHoCAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "暗影巨兽", chatlink: "[&BPcAAAA=]",see: null},
                        { duration:  15, bgcolor: "rgba(255,133,80,0.3)", name: "泰达·科文顿", chatlink: "[&BKgBAAA=]",see: null, class: "future" }
                    ]};
                var hwb = {
                    phases: [
                        { duration:  15, bgcolor: "#EA788F", name: "三重麻烦", chatlink: "[&BKoBAAA=]",see: null  },
                        { duration: 105, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "rgba(234,120,143,0.3)", name: "喀壳虫女王", chatlink: "[&BNUGAAA=]",see: null, class: "future" }
                    ]};
                break;

            case 6:
                var wb = {
                    name: "世界BOSS",
                    phases: [
                        { duration:  15, bgcolor: "#FF8550", name: "泰达·科文顿", chatlink: "[&BKgBAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "斯瓦尼亚萨满", chatlink: "[&BMIDAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "超能毁灭者", chatlink: "[&BM0CAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "火元素", chatlink: "[&BEcAAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "碎裂巨兽", chatlink: "[&BE4DAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "巨型丛林地虫", chatlink: "[&BEEFAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "莫迪尔沃尔格斯", chatlink: "[&BLAAAAA=]",see: null},
                        { duration:  15, bgcolor: "#FFA850", name: "暗影巨兽", chatlink: "[&BPcAAAA=]",see: null},
                        { duration:  15, bgcolor: "rgba(255,133,80,0.3)", name: "魔像马克II型", chatlink: "[&BNQCAAA=]",see: null ,class: "future" }
                    ]};
                var hwb = {
                    phases: [
                        { duration:  15, bgcolor: "#EA788F", name: "喀壳虫女王", chatlink: "[&BNUGAAA=]",see: null },
                        { duration:  45, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "#EA788F", name: "吞噬托", chatlink: "[&BNABAAA=]",see: null },
                        { duration:  45, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "rgba(234,120,143,0.3)", name: "三重麻烦", chatlink: "[&BKoBAAA=]",see: null , class: "future" }
                    ]};
                break;

            case 8:
                var wb = {
                    name: "世界BOSS",
                    phases: [
                        { duration:  15, bgcolor: "#FF8550", name: "魔像马克II型", chatlink: "[&BNQCAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "斯瓦尼亚萨满", chatlink: "[&BMIDAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "卓玛之爪", chatlink: "[&BHoCAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "火元素", chatlink: "[&BEcAAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "泰达·科文顿", chatlink: "[&BKgBAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "巨型丛林地虫", chatlink: "[&BEEFAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "超能毁灭者", chatlink: "[&BM0CAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "暗影巨兽", chatlink: "[&BPcAAAA=]",see: null},
                        { duration:  15, bgcolor: "rgba(255,133,80,0.3)", name: "碎裂巨兽", chatlink: "[&BE4DAAA=]",see: null, class: "future" }
                    ]};
                var hwb = {
                    phases: [
                        { duration:  15, bgcolor: "#EA788F", name: "三重麻烦", chatlink: "[&BKoBAAA=]",see: null  },
                        { duration: 105, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "rgba(233,169,184,0.3)", name: null, class: "future" }
                    ]};
                break;

            case 10:
                var wb = {
                    name: "世界BOSS",
                    phases: [
                        { duration:  15, bgcolor: "#FF8550", name: "碎裂巨兽", chatlink: "[&BE4DAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "斯瓦尼亚萨满", chatlink: "[&BMIDAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "莫迪尔沃尔格斯", chatlink: "[&BLAAAAA=]",see: null},
                        { duration:  15, bgcolor: "#FFA850", name: "火元素", chatlink: "[&BEcAAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "魔像马克II型", chatlink: "[&BNQCAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "巨型丛林地虫", chatlink: "[&BEEFAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "卓玛之爪", chatlink: "[&BHoCAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "暗影巨兽", chatlink: "[&BPcAAAA=]",see: null},
                        { duration:  15, bgcolor: "rgba(255,133,80,0.3)", name: "泰达·科文顿", chatlink: "[&BKgBAAA=]",see: null, class: "future" }
                    ]};
                var hwb = {
                    phases: [
                        { duration:  30, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "#EA788F", name: "喀壳虫女王", chatlink: "[&BNUGAAA=]",see: null },
                        { duration:  45, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "#EA788F", name: "吞噬托", chatlink: "[&BNABAAA=]",see: null },
                        { duration:  15, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "rgba(233,169,184,0.3)", name: null, class: "future" }
                    ]};
                break;

            case 12:
                var wb = {
                    name: "世界BOSS",
                    phases: [
                        { duration:  15, bgcolor: "#FF8550", name: "泰达·科文顿", chatlink: "[&BKgBAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "斯瓦尼亚萨满", chatlink: "[&BMIDAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "超能毁灭者", chatlink: "[&BM0CAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "火元素", chatlink: "[&BEcAAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "碎裂巨兽", chatlink: "[&BE4DAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "巨型丛林地虫", chatlink: "[&BEEFAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "莫迪尔沃尔格斯", chatlink: "[&BLAAAAA=]",see: null},
                        { duration:  15, bgcolor: "#FFA850", name: "暗影巨兽", chatlink: "[&BPcAAAA=]",see: null},
                        { duration:  15, bgcolor: "rgba(255,133,80,0.3)", name: "魔像马克II型", chatlink: "[&BNQCAAA=]",see: null ,class: "future" }
                    ]};
                var hwb = {
                    phases: [
                        { duration:  30, bgcolor: "#E9A9B8",  name: null },
                        { duration:  15, bgcolor: "#EA788F", name: "三重麻烦", chatlink: "[&BKoBAAA=]",see: null  },
                        { duration:  75, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "rgba(233,169,184,0.3)", name: null, class: "future" }
                    ]};
                break;

            case 14:
                var wb = {
                    name: "世界BOSS",
                    phases: [
                        { duration:  15, bgcolor: "#FF8550", name: "魔像马克II型", chatlink: "[&BNQCAAA=]" ,see: null},
                        { duration:  15, bgcolor: "#FFA850", name: "斯瓦尼亚萨满", chatlink: "[&BMIDAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "卓玛之爪", chatlink: "[&BHoCAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "火元素", chatlink: "[&BEcAAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "泰达·科文顿", chatlink: "[&BKgBAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "巨型丛林地虫", chatlink: "[&BEEFAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "超能毁灭者", chatlink: "[&BM0CAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "暗影巨兽", chatlink: "[&BPcAAAA=]",see: null},
                        { duration:  15, bgcolor: "rgba(255,133,80,0.3)", name: "碎裂巨兽", chatlink: "[&BE4DAAA=]",see: null, class: "future" }
                    ]};
                var hwb = {
                    phases: [
                        { duration:  60, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "#EA788F", name: "喀壳虫女王", chatlink: "[&BNUGAAA=]",see: null },
                        { duration:  45, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "rgba(233,169,184,0.3)", name: null, class: "future" }
                    ]};
                break;

            case 16:
                var wb = {
                    name: "世界BOSS",
                    phases: [
                        { duration:  15, bgcolor: "#FF8550", name: "碎裂巨兽", chatlink: "[&BE4DAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "斯瓦尼亚萨满", chatlink: "[&BMIDAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "莫迪尔沃尔格斯", chatlink: "[&BLAAAAA=]",see: null},
                        { duration:  15, bgcolor: "#FFA850", name: "火元素", chatlink: "[&BEcAAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "魔像马克II型", chatlink: "[&BNQCAAA=]" ,see: null},
                        { duration:  15, bgcolor: "#FFA850", name: "巨型丛林地虫", chatlink: "[&BEEFAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "卓玛之爪", chatlink: "[&BHoCAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "暗影巨兽", chatlink: "[&BPcAAAA=]",see: null},
                        { duration:  15, bgcolor: "rgba(255,133,80,0.3)", name: "泰达·科文顿", chatlink: "[&BKgBAAA=]",see: null, class: "future" }
                    ]};
                var hwb = {
                    phases: [
                        { duration:  15, bgcolor: "#EA788F", name: "吞噬托", chatlink: "[&BNABAAA=]",see: null },
                        { duration:  45, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "#EA788F", name: "三重麻烦", chatlink: "[&BKoBAAA=]",see: null  },
                        { duration:  45, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "rgba(234,120,143,0.3)", name: "喀壳虫女王", chatlink: "[&BNUGAAA=]",see: null, class: "future" }
                    ]};
                break;

            case 18:
                var wb = {
                    name: "世界BOSS",
                    phases: [
                        { duration:  15, bgcolor: "#FF8550", name: "泰达·科文顿", chatlink: "[&BKgBAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "斯瓦尼亚萨满", chatlink: "[&BMIDAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "超能毁灭者", chatlink: "[&BM0CAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "火元素", chatlink: "[&BEcAAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "碎裂巨兽", chatlink: "[&BE4DAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "巨型丛林地虫", chatlink: "[&BEEFAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "莫迪尔沃尔格斯", chatlink: "[&BLAAAAA=]",see: null},
                        { duration:  15, bgcolor: "#FFA850", name: "暗影巨兽", chatlink: "[&BPcAAAA=]",see: null},
                        { duration:  15, bgcolor: "rgba(255,133,80,0.3)", name: "魔像马克II型", chatlink: "[&BNQCAAA=]",see: null ,class: "future" }
                    ]};
                var hwb = {
                    phases: [
                        { duration:  15, bgcolor: "#EA788F", name: "喀壳虫女王", chatlink: "[&BNUGAAA=]",see: null },
                        { duration:  45, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "#EA788F", name: "吞噬托", chatlink: "[&BNABAAA=]",see: null },
                        { duration:  45, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "rgba(234,120,143,0.3)", name: "三重麻烦", chatlink: "[&BKoBAAA=]",see: null , class: "future" }
                    ]};
                break;

            case 20:
                var wb = {
                    name: "世界BOSS",
                    phases: [
                        { duration:  15, bgcolor: "#FF8550", name: "魔像马克II型", chatlink: "[&BNQCAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "斯瓦尼亚萨满", chatlink: "[&BMIDAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "卓玛之爪", chatlink: "[&BHoCAAA=]",see: null},
                        { duration:  15, bgcolor: "#FFA850", name: "火元素", chatlink: "[&BEcAAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "泰达·科文顿", chatlink: "[&BKgBAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "巨型丛林地虫", chatlink: "[&BEEFAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "超能毁灭者", chatlink: "[&BM0CAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "暗影巨兽", chatlink: "[&BPcAAAA=]",see: null},
                        { duration:  15, bgcolor: "rgba(255,133,80,0.3)", name: "碎裂巨兽", chatlink: "[&BE4DAAA=]",see: null, class: "future" }
                    ]};
                var hwb = {
                    phases: [
                        { duration:  15, bgcolor: "#EA788F", name: "三重麻烦", chatlink: "[&BKoBAAA=]",see: null  },
                        { duration: 105, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "rgba(233,169,184,0.3)", name: null, class: "future" }
                    ]};
                break;

            case 22:
                var wb = {
                    name: "世界BOSS",
                    phases: [
                        { duration:  15, bgcolor: "#FF8550", name: "碎裂巨兽", chatlink: "[&BE4DAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "斯瓦尼亚萨满", chatlink: "[&BMIDAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "莫迪尔沃尔格斯", chatlink: "[&BLAAAAA=]",see: null},
                        { duration:  15, bgcolor: "#FFA850", name: "火元素", chatlink: "[&BEcAAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "魔像马克II型", chatlink: "[&BNQCAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "巨型丛林地虫", chatlink: "[&BEEFAAA=]",see: null },
                        { duration:  15, bgcolor: "#FF8550", name: "卓玛之爪", chatlink: "[&BHoCAAA=]",see: null },
                        { duration:  15, bgcolor: "#FFA850", name: "暗影巨兽", chatlink: "[&BPcAAAA=]",see: null},
                        { duration:  15, bgcolor: "rgba(255,133,80,0.3)", name: "泰达·科文顿", chatlink: "[&BKgBAAA=]",see: null, class: "future" }
                    ]};
                var hwb = {
                    phases: [
                        { duration:  60, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "#EA788F", name: "喀壳虫女王", chatlink: "[&BNUGAAA=]",see: null },
                        { duration:  45, bgcolor: "#E9A9B8", name: null },
                        { duration:  15, bgcolor: "rgba(234,120,143,0.3)", name: "吞噬托", chatlink: "[&BNABAAA=]",see: null, class: "future" }
                    ]};
                break;
        }
        const metas = [ nd, wb, hwb, vb, ab, td, ds, dt ]
        const {hours,minutes,percentOfTwoHours} = this.state
        const style = {
            line:{
                background: "red",
                width: 2,
                boxShadow: "0 3px 10px 2px rgba(0,0,0,0.3)",
                height: '100%',
                position: 'absolute',
                left:`${percentOfTwoHours}%`
            }
        }

        return (
            <div id="timer-wrapper">
                <div id="now_line" style={style.line}>
                    <div>{hours}:{minutes}</div>
                </div>
                {
                    metas.map(item=>{
                        let offset = 0
                        return(
                            <div>
                                <div style={{color:'hsl(0,0%,40%)',fontWeight:500,fontSize:'1.5em',paddingTop:'10px'}}>{item.name}</div>
                                <div>
                                {
                                    item.phases.map((i) => {

                                        var hrs = -(new Date().getTimezoneOffset() / 60)
                                        var now2 = new Date();
                                        var startHour = Math.floor(now2.getUTCHours()/2)*2;
                                        var offsetHours = Math.floor(offset/60)+hrs

                                        if ((startHour + offsetHours) >= 24){
                                            offsetHours = offsetHours - 24
                                        }
                                        var correctedTime = null+(startHour + offsetHours);
                                        var hour = ("00" + correctedTime).slice(-2);
                                        var minute = ("00" + (offset%60)).slice(-2);

                                        offset += i.duration
                                        return (<div style={{width:`${i.duration*100/135}%`,display:'inline-block',background:i.bgcolor,height:80}}>
                                        <div style={{overflow:'hide',lineHeight:"2em"}}>
                                            <div>
                                                {hour}:{minute}
                                            </div>
                                            <div>
                                                {i.chatlink||"无"}
                                            </div>
                                            <div>
                                                {i.name||"无"}
                                            </div>
                                        </div>
                                        </div>)
                                    })
                                }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
