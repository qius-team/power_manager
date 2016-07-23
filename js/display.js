/**
 * Created by t702 on 16-7-17.
 */

function chagnge_sidebar(){
    //更改id为pumin-sidebar的元素中的内容
    $("#pumin-sidebar").load("sidebar.html #pumin-sidebar-content");
    $("#pumin-sidebar").load("../sidebar.html #pumin-sidebar-content");
    // $("ul li a").click(function(){
    //     this.parent.setAttribute("class","active");
    // });
}

function test(){

    var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var randomScalingFactor = function() {
        return Math.round(Math.random() * 100);
        //return 0;
    };
    var randomColorFactor = function() {
        return Math.round(Math.random() * 255);
    };
    var randomColor = function(opacity) {
        return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
    };

    var config = {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "My First dataset",
                data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
                fill: false,
                borderDash: [5, 5],
            }, {
                hidden: true,
                label: 'hidden dataset',
                data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
            }, {
                label: "My Second dataset",
                data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
            }]
        },
        options: {
            responsive: true,
            title:{
                display:true,
                text:'Chart.js Line Chart'
            },
            tooltips: {
                mode: 'label',
                callbacks: {
                    // beforeTitle: function() {
                    //     return '...beforeTitle';
                    // },
                    // afterTitle: function() {
                    //     return '...afterTitle';
                    // },
                    // beforeBody: function() {
                    //     return '...beforeBody';
                    // },
                    // afterBody: function() {
                    //     return '...afterBody';
                    // },
                    // beforeFooter: function() {
                    //     return '...beforeFooter';
                    // },
                    // footer: function() {
                    //     return 'Footer';
                    // },
                    // afterFooter: function() {
                    //     return '...afterFooter';
                    // },
                }
            },
            hover: {
                mode: 'dataset'
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        show: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        show: true,
                        labelString: 'Value'
                    },
                    ticks: {
                        suggestedMin: -10,
                        suggestedMax: 250,
                    }
                }]
            }
        }
    };

    $.each(config.data.datasets, function(i, dataset) {
        dataset.borderColor = randomColor(0.4);
        dataset.backgroundColor = randomColor(0.5);
        dataset.pointBorderColor = randomColor(0.7);
        dataset.pointBackgroundColor = randomColor(0.5);
        dataset.pointBorderWidth = 1;
    });

    var ctx = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx, config);
}


//data.medias是一个二维数组:[[“用电”，12345],["用水",123],...]
//其中12345，123的单位是人民币 元；第二个参数为元素id，如:'content'
function show_energy_medias_in_pie(data, element_id ) {

    //使用data.medias来设置饼图
    var config = {

    };

    var ctx = document.getElementById(element_id).getContext("2d");
    window.energy_medias = new Chart(ctx, config);
}
function test_show_energy_medias_in_pie() {
    var medias = [
        ['耗电',345],
        ['用水',123],
        ['燃气',67],
        ['其他',34]
    ];
    var data = {};
    data.medias = medias;
    var id = "energy_medias";
    show_energy_medias_in_pie(data,id);
}


