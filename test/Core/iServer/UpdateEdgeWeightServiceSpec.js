require('../../../src/Core/iServer/UpdateEdgeWeightService');

var serviceFailedEventArgsSystem = null;
var serviceCompletedEventArgsSystem = null;

//服务初始化时注册事件监听函数
var networkAnalystURL = "http://localhost:8090/iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun";
function initUpdateEdgeWeightService_RegisterListener() {
    return new SuperMap.REST.UpdateEdgeWeightService(networkAnalystURL,
        {eventListeners:{
            'processFailed': updateEdgeWeightFailed,
            'processCompleted': updateEdgeWeightCompleted
        }}
    );
}
function updateEdgeWeightFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}
function updateEdgeWeightCompleted(serviceCompletedEventArgs){
    serviceCompletedEventArgsSystem = serviceCompletedEventArgs;
}

describe('testUpdateEdgeWeightService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('noParams',function(done){
        var myUpdateEdgeWeightService = initUpdateEdgeWeightService_RegisterListener();
        expect(myUpdateEdgeWeightService).not.toBeNull();
        myUpdateEdgeWeightService.processAsync();
        setTimeout(function() {
            try{
                expect(typeof(myUpdateEdgeWeightService.processAsync()) === "undefined").toBeTruthy();
                myUpdateEdgeWeightService.destroy();
                expect(myUpdateEdgeWeightService.EVENT_TYPES).toBeNull();
                expect(myUpdateEdgeWeightService.events).toBeNull();
                expect(myUpdateEdgeWeightService.eventListeners).toBeNull();
                done();
            }catch(exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                myUpdateEdgeWeightService.destroy();
                done();
            }
        },5000)
    });
});