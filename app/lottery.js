import $ from 'jquery'

export let lottery = {
    index: -1,
    count: 0,
    timer: 0,
    speed: 20,
    times: 0,
    cycle: 50,
    prize: -1,
    init: id => {
        if ($("#" + id).find(".lottery-unit").length > 0) {
            var $lottery = $("#" + id);
            var $units = $lottery.find(".lottery-unit");
            this.obj = $lottery;
            this.count = $units.length;
            $lottery.find(".lottery-unit-" + this.index).addClass("active");
        };
    },
    roll: () => {
        var index = this.index;
        var count = this.count;
        var lottery = this.obj;
        $(lottery).find(".lottery-unit-" + index).removeClass("active");
        index += 1;
        if (index > count - 1) {
            index = 0;
        };
        $(lottery).find(".lottery-unit-" + index).addClass("active");
        this.index = index;
        return false;
    },
    stop: index => {
        this.prize = index;
        return false;
    }

};

