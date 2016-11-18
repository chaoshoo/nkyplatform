//this file use for analytics channel
$(document).ready(function(){
  $(document).bind('click',function(){
    window.hidePopFrame();
    var pd = $("#pd").val();
    //周恩至根据需要添加代码起
   
  });
  //init chart
  var url = '/apps/'+ global.appid +'/channels/';
  window.global.renderPage = function(page_type,render,params){
    var chart_params_default = UMENG.Agent.buildParams({stats:$('#tabpanel_items').renderTab('get_status'),
      channel_ids:[]});

    var table_param_default = {
      date:$('#daytime').renderTab('get_status'),
      stats:'list',
      per_page:30,
      group_id: $('#channelgroup').DownList('get').attr('id')
    };
    delete table_param_default.counts;
    formatter = {
      duration: {
        'tooltip':{
          formatter: function() {
            var hh = Math.floor(this.y / 3600);
            var mm = Math.floor(this.y % 3600 / 60);
            var ss = Math.floor(this.y % 60);

            if (hh == 0) {
              return this.key + getHoliday(this.key,this.series.userOptions) + ' ' + this.series.name + ' : ' + mm + I18n.t('components.filters.time_unit.minute_count_unit') + ss + I18n.t('components.filters.time_unit.second_count_unit');
            } else {
              return this.key + getHoliday(this.key,this.series.userOptions) + ' ' + this.series.name + ' : ' + hh + I18n.t('components.filters.time_unit.hour_count_unit') + mm + I18n.t('components.filters.time_unit.minute_count_unit') + ss + I18n.t('components.filters.time_unit.second_count_unit');
            }
          }
        },
        'yAxis':{
           labels: {
             formatter: function() {
               var hh = Math.floor(this.value / 3600);
               var mm = Math.floor(this.value % 3600 / 60);
               var ss = Math.floor(this.value % 60);

               if (hh == 0) {
                 return mm + I18n.t('components.filters.time_unit.minute_count_unit') + ss + I18n.t('components.filters.time_unit.second_count_unit');
               } else {
                 return hh + I18n.t('components.filters.time_unit.hour_count_unit') + mm + I18n.t('components.filters.time_unit.minute_count_unit') + ss + I18n.t('components.filters.time_unit.second_count_unit');
               }
             }
           }
        }
      },
      day_retention: {
        'tooltip':{formatter: function() {  return this.series.name +' '+ this.x+ getHoliday(this.key,this.series.userOptions)+': '+this.y+'%';} },
        'yAxis': {
          labels: {
            formatter: function() {
              return this.value +'%'
            }
          }
        }
      }
    }
    formatterDefault = {
      'tooltip':{formatter: function() {  return this.series.name +' '+ this.x + getHoliday(this.key,this.series.userOptions) +': '+this.y;} },
      'xAxis': {
        labels: {
          align: 'center'
        }
      }
    }
    formatterOfList = formatter[chart_params_default.stats] || formatterDefault;
    switch (page_type){
      case 'list' :
      if(render == 'chart'){
        try{
          $('#chartcontainer').renderChart({url: url+'load_chart_data',params: chart_params_default,chartParams: formatterOfList});
        }
        catch(e){
        };
      };
      if(render == 'table'){
        var type = arguments[3];
        var temp = '';

        if(type == 'today' || undefined){
          temp = '<tr><td><a href="channels/${id}">${name}</a></td><td>${install}</td><td>${active_user}</td><td>${total_install}(${total_install_rate}%)</td></tr>';
        }else{
          temp = '<tr><td><a href="channels/${id}">${name}</a></td><td>${install}</td><td>${active_user}</td><td>${launch}</td><td>${duration}</td><td>${total_install}(${total_install_rate}%)</td></tr>';
        }
        $('.data-load').trigger("destroy");
        $('#data-load-channels').renderTable({
          url: url + 'load_table_data',
          params: params || table_param_default,
          tmpl : temp,
          per_page:30,
          callback: function(){
              $('.specialBtm').show();
            if(type == 'today'){
              $('#data-load-channels table thead tr th').remove();
              $('#data-load-channels table thead tr').append('<th>'+I18n.t('page_misc.channel.channel_name')+'</th><th>'+I18n.t('metrics.installation.name')+'</th><th>'+I18n.t('metrics.active_user.name')+'</th><th>'+I18n.t('metrics.total_user.name')+'('+I18n.t('components.labels.ratio')+')</th>');
            }
            if(type == 'yesterday'){
              $('#data-load-channels table thead tr th').remove();
              $('#data-load-channels table thead tr').append('<th>'+I18n.t('page_misc.channel.channel_name')+'</th><th>'+I18n.t('metrics.installation.name')+'</th><th>'+I18n.t('metrics.active_user.name')+'</th><th>'+I18n.t('metrics.launch.name')+'</th><th>'+I18n.t('metrics.duration_per_launch.name')+'</th><th>'+I18n.t('metrics.total_user.name')+'('+I18n.t('components.labels.ratio')+')</th>');
            }
            $('#data-load table').tablesorter();
          }
        });
      }
      if(render == 'all'){
        var type = arguments[3];
        var temp = '';
        if(type == 'today' || undefined){
          temp = '<tr><td><a href="channels/${id}">${name}</a></td><td>${install}</td><td>${active_user}</td><td>${total_install}(${total_install_rate}%)</td></tr>';
        }else{
          temp = '<tr><td><a href="channels/${id}">${name}</a></td><td>${install}</td><td>${active_user}</td><td>${launch}</td><td>${duration}</td><td>${total_install}(${total_install_rate}%)</td></tr>';
        }
        try{
          $('#chartcontainer').renderChart({ url: url+'load_chart_data', params: chart_params_default,chartParams: formatterOfList });
        }
        catch(e){
        };
        $('#data-load-channels').renderTable({
          url: url + 'load_table_data',
          params: params || table_param_default,
          tmpl : temp,
          per_page:30,
          callback: function(inst, data){
              $('.specialBtm').show();
            if(type == 'today'){
              $('#data-load-channels table thead tr th').remove();
              $('#data-load-channels table thead tr').append('<th>'+I18n.t('page_misc.channel.channel_name')+'</th><th>'+I18n.t('metrics.installation.name')+'</th><th>'+I18n.t('metrics.active_user.name')+'</th><th>'+I18n.t('metrics.total_user.name')+'('+I18n.t('components.labels.ratio')+')</th>');
            }
            if(type == 'yesterday'){
              $('#data-load-channels table thead tr th').remove();
              $('#data-load-channels table thead tr').append('<th>'+I18n.t('page_misc.channel.channel_name')+'</th><th>'+I18n.t('metrics.installation.name')+'</th><th>'+I18n.t('metrics.active_user.name')+'</th><th>'+I18n.t('metrics.launch.name')+'</th><th>'+I18n.t('metrics.duration_per_launch.name')+'</th><th>'+I18n.t('metrics.total_user.name')+'('+I18n.t('components.labels.ratio')+')</th>');
            }
            $('.data-load').tablesorter();
            if (data.result === 'success' && data.stats.length > 20) {
              setFeatureTour();
            }
          }
        });

        function setFeatureTour(){
          var dst = localStorage.getItem('channelsStepTip');
          if(dst == undefined || dst ===null){
            step1();
          }else{
            switch (dst)
            {
              case '0':
                step1();
              break;
            }
          };


          function step1(){
            var el = $('.link-setting');
            var tipText = "";
            var tipWidth, tipLeft;
            if(I18n.locale == 'zh'){
              tipWidth = 400;
              tipLeft = '64px';
              tipText = '当您的渠道过多时，您可以在“设置-渠道”页面隐藏测试渠道、不关注的渠道。隐藏的渠道不再展示在页面上，但数据仍旧继续统计。';
            } else {
              tipWidth = 433;
              tipLeft = '89px';
              tipText = 'When there are too many channels, you can hide channels don\'t be concerned about. Hidden channels will not be viewed, but sill be counted.'
            }
            if(el){
              el.guideTip({
                top: '-12px',
                left: tipLeft,
                corner: 'left',
                width: tipWidth,
                border: false,
                text: tipText,
                close:function(){
                  localStorage.setItem('channelsStepTip','1');
                }
              });
            }
          };


        }
      }
      break;
      case 'details' :
      var channel_ids = $('#channellist').DownList('get').attr('id');
      var chart_param_detail = $.extend(true,{},chart_params_default,{'channel_ids': [channel_ids],versions:[global.filter.version]});
      var users_sources = {
        start_date: global.fixedStartDay,
        end_date: global.fixedEndDay,
        channel_id: $('#channellist').DownList('get').attr('id'),
        stats: $('#usersources').renderTab('get_status')
      };
      if(render == 'chart'){
        try{
          if(typeof(formatter[chart_params_default.stats])=='object'){
              $('#chartcontainer').renderChart({
                  url: url+'load_chart_data',
                  params: chart_param_detail,
                  chartParams: formatter[chart_param_detail.stats],
                  callback: function(){
                      UMENG.MileStoneChart = 'chartcontainer';
                      $('#chartcontainer').mileStones();
                  }
              });
          }else{
            $('#chartcontainer').renderChart({
                url: url+'load_chart_data',
                params: chart_param_detail,
                chartParams:formatterDefault,
                callback: function(){
                    UMENG.MileStoneChart = 'chartcontainer';
                    $('#chartcontainer').mileStones();
                }
            });
          }
        }catch(e){
        };
        Filter().Set($('#const-channel'), I18n.t('components.compare.channel'));
        $('#table-chartDetails').renderTable({
          url: url + 'load_table_data',
          tmpl : '<tr><td>${date}</td><td>${install}</td><td>${active_user}</td><td>${launch}</td><td>${duration}</td><td>${retention}%</td></tr>',
          params: {
            start_date: global.pickedStartDay,
            end_date: global.pickedEndDay,
            channels:[global.filter.channel],
            versions:[global.filter.version],
            segments:[window.global.filter.segment],
            stats: 'trend',
            channel_id: $('#channellist').DownList('get').attr('id')
          }
        })
      }
      if(render == 'uers_sources'){
          $('#us_chartcontainer').renderChart({
              url: url+'load_chart_data',
              params: users_sources,
              chartParams: {
                  chart:{type: 'bar'},
                  tooltip:{
                      formatter: function() {
                          return '' + this.x + ': ' + this.y + '%';
                      }
                  },
                  plotOptions: { series: { pointWidth : 15} },
                  xAxis:{
                      labels:{
                          align:"right"
                      }
                  },
                  yAxis: {
                      labels: {
                          formatter: function() {
                              return this.value +'%'
                          }
                      }
                  }
              }
          });
        $('#details-data-load').renderTable({
          url: url + 'load_table_data',
          params: users_sources,
          tmpl : '<tr><td>${name}</td><td>${num}</td><td>${rate}%</td></tr>'
        });
      }
      if(render == 'all'){
        try{
          if(typeof(formatter[chart_params_default.stats])=='object'){
              $('#chartcontainer').renderChart({
                  url: url+'load_chart_data',
                  params: chart_param_detail,
                  chartParams: formatter[chart_param_detail.stats],
                  callback: function(){
                      UMENG.MileStoneChart = 'chartcontainer';
                      $('#chartcontainer').mileStones();
                  }
              });
          }else{
              $('#chartcontainer').renderChart({
                  url: url+'load_chart_data',
                  params: chart_param_detail,
                  callback: function(){
                      UMENG.MileStoneChart = 'chartcontainer';
                      $('#chartcontainer').mileStones();
                  }
              });
          }
        }catch(e){
        };
        $('#us_chartcontainer').renderChart({
            url: url+'load_chart_data',
            params: users_sources,
            chartParams: {
                chart:{type: 'bar'},
                plotOptions:{
                    series:{
                        pointWidth:14
                    }
                },
                tooltip:{
                    formatter: function() {
                        return '' + this.x + ': ' + this.y + "%";
                    }
                },
                xAxis:{
                    labels:{
                        align:"right"
                    }
                },
                yAxis: {
                    labels: {
                        formatter: function() {
                            return this.value +'%'
                        }
                    }
                }
            }
        });
        $('#active-data-load').renderTable({
          url: url + 'load_table_data',
          params: {
            stats: 'active_summary',
            channel_id: $('#channellist').DownList('get').attr('id')
          },
          tmpl : '<tr><td>${name}</td><td>${num}</td><td>${ratio}%</td></tr>'
        });
        $('#retention-data-load').renderTable({
          url: url + 'load_table_data',
          params: {
            stats: 'retention_summary',
            channel_id: $('#channellist').DownList('get').attr('id')
          },
          tmpl : '<tr><td>${name}</td><td>${rate}%</td></tr>'
        });
        $('#details-data-load').renderTable({
          url: url + 'load_table_data',
          params: users_sources,
          tmpl : '<tr><td>${name}</td><td>${num}</td><td>${rate}%</td></tr>'
        });
        $('#table-chartDetails').renderTable({
          url: url + 'load_table_data',
          tmpl : '<tr><td>${date}</td><td>${install}</td><td>${active_user}</td><td>${launch}</td><td>${duration}</td><td>${retention}%</td></tr>',
          params: {
            start_date: global.pickedStartDay,
            end_date: global.pickedEndDay,
            channels:[global.filter.channel],
            versions:[global.filter.version],
            segments:[window.global.filter.segment],
            stats: 'trend',
            channel_id: $('#channellist').DownList('get').attr('id')
          }
        })
      };
      break;
      case 'custom':
        if (render === 'table') {
          var metricsHash =  {
            'install': I18n.t('metrics.installation.name'),
            'active_user': I18n.t('metrics.active_user.name'),
            'launch': I18n.t('metrics.launch.name'),
            'duration_per_launch': I18n.t('metrics.duration_per_launch.average'),
            'duration_daily': I18n.t('metrics.duration_daily.average'),
            'launch_avg': I18n.t('metrics.launch.average'),
            'depth': I18n.t('metrics.depth.average'),
            'retention_daily': I18n.t('metrics.retention.morrow'),
            'retention_weekly': I18n.t('metrics.retention.day_7'),
            'old_user_ratio': I18n.t('metrics.old_user.ratio'),
            'duration_contribute': I18n.t('metrics.duration.contribute'),
            'depth_contribute': I18n.t('metrics.depth.contribute'),
            'active_ratio_weekly': I18n.t('metrics.active_user.weekly_ratio'),
            'active_ratio_monthly': I18n.t('metrics.active_user.monthly_ratio')
          };
          var ratioHash = {
            'old_user_ratio': true,
            'retention_daily': true,
            'retention_weekly': true,
            'active_ratio_weekly': true,
            'active_ratio_monthly': true
          };
          var type = arguments[3];
          var temp = [];
          var header = [];
          var defaultMetrics = [
            {id:'install', name:I18n.t('metrics.installation.name')},
            {id:'duration_per_launch', name:I18n.t('metrics.duration_per_launch.average')},
            {id:'old_user_ratio', name:I18n.t('metrics.old_user.ratio')},
            {id:'duration_contribute', name:I18n.t('metrics.duration.contribute')},
            {id:'depth_contribute', name:I18n.t('metrics.depth.contribute')}
          ];
          var defaultMetricsID = [];
          $.each(defaultMetrics, function(index, value) {
            defaultMetricsID.push(value.id);
          });
          var channels, metrics;
          if ($('#user_email').length > 0) {
            user_email = $('#user_email').attr('attr-id');
          }
          if ($('#channel-selector').data('multiSelector')) {
            channels = $('#channel-selector').multiSelector('getResult');
          }
          var channelSign = MD5(user_email + window.location.pathname + 'channel-selector');
          var cachedChannels = JSON.parse(localStorage.getItem(channelSign + 'channel-selector'));
          if (!$.isArray(channels)) {
            if (cachedChannels !== null) {
              channels = cachedChannels;
            } else {
              channels = [];
            }
          }

          if ($('#metrics-selector').data('multiSelector')) {
            metrics = $('#metrics-selector').multiSelector('getResult');
          }
          var metricsSign = MD5(user_email + window.location.pathname + 'metrics-selector');
          var cachedMetrics = JSON.parse(localStorage.getItem(metricsSign + 'metrics-selector'));
          if (!$.isArray(metrics)) {
            if (cachedMetrics !== null && $.isArray(cachedMetrics) && cachedMetrics.length > 0) {
              metrics = cachedMetrics;
            } else {
              metrics = defaultMetricsID;
              localStorage.setItem(metricsSign + 'selectedData', JSON.stringify(defaultMetrics));
            }
          }

          var params = {
            start_date: global.pickedStartDay,
            end_date: global.pickedEndDay,
            per_page:30,
            channels: channels,
            metrics: metrics,
            stats: 'custom'
          };

          // template
          temp.push('<tr><td><a href="${cid}" title="${channel}">${channel}</a></td>');
          header.push('<th style="width:182px" class="retention-table-first-col" >'+I18n.t('page_misc.channel.channel_name')+'</th>');
          $.each(metrics, function(index, value) {
            var percentNotation = '';
            if (value in ratioHash) {
              percentNotation = '%';
            }
            temp.push('<td>${' + value + '}' + percentNotation + '</td>');
            header.push('<th>'+ metricsHash[value] +'</th>');
          });
          temp.push('</tr>');

          $('.data-load').trigger("destroy");
          $('#data-load-channels').renderTable({
            url: url + 'load_table_data',
            params: params,
            tmpl : temp.join(''),
            per_page:30,
            callback: function(){
              $('#data-load-channels table thead tr th').remove();
              $('#data-load-channels table thead tr').append(header.join(''));
              //$('#data-load table').tablesorter();
            }
          });
        }
      break;
    }
    _track_components_usage();
  }
  //init channel group
  if($('#channelgroup').length>0){
    $('#channelgroup').DownList({
      is_ajax: true,
      url: url+'load_channel_groups',
      temp:'<li><a class="event" id="${id}" title="${name}">${name}</a></li>',
      callback:function(_this){
        window.global.renderPage('list','table',{
          date:$('#daytime').renderTab('get_status'),
          stats:'list',
          per_page:30,
          group_id: _this.attr('id')
        },$('#daytime').renderTab('get_status'));
        return false;
      }
    })
  };
  //load channels
  if($('#channellist').length>0){
    $('#channellist').DownList({
      is_ajax: true,
      search:'on',
      searchTemp:'<li><a href="/apps/'+global.appid + '/channels/${id}" id="${id}" title="${name}">${name}</a></li>',
      url: '/apps/'+global.appid+'/load_channels',
      temp:'<li><a href="/apps/'+global.appid + '/channels/${id}" id="${id}" title="${name}">${name}</a></li>'
    })
  };
  //init channel filter
  $('#version-filter-version').Filter({
    panelid : 'filt-version',
    url : '/apps/'+global.appid+'/load_versions',
    text : I18n.t('components.filters.version'),
    templDefault : '{{if is_shown}}<li><input type="checkbox" id="${name}" {{if check}}checked=${check}{{/if}}/>${name}</li>{{/if}}',
    templSearch : '<li><input type="checkbox" id="${name}" {{if check}}checked=${check}{{/if}}/>${name}</li></li>',
    templchecked :  '{{if check}}<li><input type="checkbox" id="${name}" checked="${check}"/>${name}</li>{{/if}}',
    callback : function(inst,data){
      if(data.check){
        global.filter.version = data.id;
      }else{
        global.filter.version = '';
      }
      if( typeof window.global.renderPage === "function" ){
        window.global.renderPage('details','chart');
      }
    }
  });
  //init constrast channel
  $('#const-channel').Filter({
    panelid : 'const-chan',
    url : '/apps/'+global.appid+'/load_channels',
    text : I18n.t('components.compare.channel'),
    callback : function(inst,data){
      if($('#channellist').DownList('get').attr('id') == data.id){
        Filter().Set($('#const-channel'), I18n.t('components.compare.channel'));
        alert(I18n.t('components.compare.should_not_dup'));
      }else{
        inst.text(I18n.t('components.compare.channel'));
        $('#chartcontainer').after('<div class="loadingChart"><img src="/images/pic/ajax-loader.gif" /></div>');
        global.contrast.push(data.id);
        var constparam = {
          is_compared:true,
          start_date: global.pickedStartDay,
          end_date: global.pickedEndDay,
          channel_ids:[global.contrast[global.contrast.length-1]],
          versions:[global.filter.version],
          segments:[window.global.filter.segment],
          stats:$('#tabpanel_items').renderTab('get_status')
        };
        $('#chartcontainer').renderChart('renderCompareChart',{url: url+'load_chart_data',params: constparam});
        Filter().Set($('#const-channel'),I18n.t('components.compare.channel'));
      }
    }
  });
  //init proselect
  $('#channel-date-select').ProSelect({
    callback : function(arr,n) {
      if (UMENG.plugin.userCustomDate.localCache){
        UMENG.plugin.userCustomDate.setDate(arr, 'localCacheDate');
      }
      window.global.renderPage('details', 'chart');
    }
  });
  $('#filter-segment').Filter({
    panelid : 'filt-segment',
    url : '/apps/'+global.appid+'/load_segments',
    text : I18n.t('components.filters.segment'),
    panelTempl : '<div class="filterpanel" style="display:none;"><input type="text" class="input" placeholder="'+I18n.t('components.filters.segment_search')+'"/><ul class="filterlist"></ul><div class="load" style="margin:10px auto;text-align:center;display:block;"><img src="/images/pic/ajax-loader.gif"/></div><div class="new-segment"><a href="/apps/'+ global.appid +'/segmentations/new" target="_blank">'+I18n.t('components.filters.segment_new')+'</a></div><div class="submitpanel"><a href="#" class="submit">'+I18n.t('components.buttons.confirm')+'</a></div></div>',
    callback : function(inst,data){
      if(data.check){
        global.filter.segment = data.id;
      }else{
        global.filter.segment = '';
      }
      if( typeof window.global.renderPage === "function" ){
        window.global.renderPage('details','chart');
      }
    }
  });
});
