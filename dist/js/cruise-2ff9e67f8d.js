var Type_Physical=0,Type_Virtual=1,State_Idle=0,State_Building=1;function Agent(){this.Id,this.Type=Type_Physical,this.Name,this.State=State_Idle,this.IP,this.Url,this.Resources=[],this.Available=!1}function History(){this.Url,this.AgentId}function GenerateAgentView(e,a){var o=document.createElement("div");function t(e){-1!=e.currentTarget.parentElement.className.indexOf("denied")&&(e.stopPropagation(),e.preventDefault())}e.forEach(function(e,a){var t=AgentTemplate,n=ResourceTemplate;for(var s in e)e.hasOwnProperty(s)&&(t=t.replace(new RegExp("\\${"+s+"}","g"),e[s]));t=t.replace(/\${index}/g,"agent"+a),n=n.replace(/\${index}/g,"agent"+a);var i=e.Available?"hidden":"";t=t.replace(/\${execDenyClass\(\)}/g,i);var c=0==e.State?"idle":"building",r=0==e.Type?" physical":" virtual";t=(t=t.replace(/\${execStateValue\(\)}/g,c)).replace(/\${execStateClass\(\)}/g,c+r);var l="";e.Resources.forEach(function(e,a){l+=n.replace(/\${template}/g,e)}),t=t.replace(/\${execResource\(\)}/g,l),o.innerHTML+=t}),a.appendChild(o),Array.prototype.slice.call(o.querySelectorAll(".agent-info-container .deny-area")).forEach(function(e,a){e.addEventListener("click",t,!0)})}function OnSpecifyResource(e){event.preventDefault();var a=document.querySelector("."+e+".popup");a.className=a.className.replace(/hidden/g,"").trim(" ")}function OnAdd(t){var n="."+t,e=document.querySelector(".popup"+n+" .resource-input"),a=document.querySelector(".popup"+n+" .label-text"),s=document.querySelector(".popup"+n+" .error-text");if(/^(\w+)(, \w+)*$/.test(e.value)){a.className=a.className.replace(/hidden|\s/g,""),s.className=s.className.replace(/display|\s/g,"");var i=this;e.value.split(", ").forEach(function(e){var a=document.createElement("div");a.className="resource",a.addEventListener("click",function(){i.OnRemove(t)}),a.innerHTML='<span class="resource-text">'+e+'</span><i class="remove">+</i>',document.querySelector(n+" .resource-container").appendChild(a)}),e.value="",this.OnClose(t)}else-1==s.className.indexOf("display")&&(s.className+=" display",a.className+=" hidden")}function OnClose(e){document.querySelector("."+e+".popup").className+=" hidden"}function OnRemove(e){/remove/g.test(event.target.className)&&document.querySelector("."+e+" .resource-container").removeChild(event.currentTarget)}function OnDenyClick(e){event.preventDefault();var a=document.querySelector(".agent-info-container."+e);/^denied|\sdenied\s|\sdenied$/g.test(a.className)?a.className=a.className.replace(/^denied|\sdenied\s|\sdenied$/g," "):a.className+=" denied"}function getCurrentAgentIndexClass(){var e=event.currentTarget.className.match(/agent\d/g);if(!e||!e.length||1!=e.length)throw"cannot match agent index...";return"."+e[0]}var ResourceTemplate='<div class="resource" onclick="OnRemove(\'${index}\')"><span class="resource-text">${template}</span><i class="remove">+</i></div>',AgentTemplate='<div class="agent-info-container ${index} ${execStateClass()}">                         <div class="deny-area col-md-11">                             <div class="circle-icon"></div>                             <div class="content-panel">                                 <div class="row">                                     <div class="agent-name col-md-6" title="${Name}">${Name}</div>                                     <div class="rightTop-panel col-md-6" title="| ${execStateValue()} | ${IP} | ${Url}">                                         | <span>${execStateValue()}</span> | <span>${IP}</span> | <span>${Url}</span>                                     </div>                                 </div>                                 <div class="row">                                     <div onclick="OnSpecifyResource(\'${index}\')" style="display:inline-block">                                         <span class="plus">+</span>                                         <a href="" class="add-resource">Specify Resource</a>                                     </div>                                     <div class="resource-container">                                         <span>| Resources:</span>                                         ${execResource()}                                     </div>                                 </div>                             </div>                         </div>                         <div class="deny-container ${execDenyClass()}">                             <i></i>                             <a href="" onclick="OnDenyClick(\'${index}\')">Deny</a>                         </div>                     </div>                     <div style="position:relative;">                         <div class="popup hidden ${index}">                             <i class="i1">                                 <i class="i2">                                 </i>                             </i>                             <div class="label-text" title="(separate multiple resources name with commas)">(separate multiple resources name with commas)</div>                             <div class="error-text">error format...add like this format 1, 2</div>                            <input class="resource-input" type="text">                             <div class="btn-area">                                 <button onclick="OnAdd(\'${index}\')">Add resources</button><button onclick="OnClose(\'${index}\')">Close</button>                             </div>                         </div>                     </div>                     ';function GenerateHistoryView(e,a){var t=document.createElement("div");e.forEach(function(e){t.innerHTML+='<div class="history" title="'+e.Url+'">'+e.Url+"</div>"}),a.appendChild(t)}