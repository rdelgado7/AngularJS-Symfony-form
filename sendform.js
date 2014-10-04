/**
 * [sendform description]
 * @param  {[string]} url       [URL for send form]
 * @param  {[string]} method    [method of form]
 * @param  {[ng-model]} model     [angular model]
 * @param  {[string]} name      [name of form in symfony]
 * @param  {[array]} variables [variables of model to send in form]
 * @return {[$http]}           [return angular $http]
 */
sendform = function(url,method,model,name,variables){
                var data = {};
                model = angular.copy(model);
                angular.forEach(variables,function(key,value){
                    if(variables.indexOf(key) > -1){
                        if(angular.isArray(model[key])){
                            angular.forEach(model[key],function(subKey,i){
                                angular.forEach(subKey,function(subSubKey,j){
                                    data[name+'['+key+']['+i+']'] = subSubKey;
                                });
                            });
                        }else{
                            if(model[key] != false)
                                data[name+'['+key+']'] = model[key];
                        }
                    }else{

                    }
                });
                console.log(data);
                data[name+'[_token]'] = jQuery('#'+name+'__token').val();
                return $http({
                    method: method,
                    url: url,
                    data: jQuery.param(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            }