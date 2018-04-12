var Type_Physical = 0;
var Type_Virtual = 1;

var State_Idle = 0;
var State_Building = 1;

function Agent() {
    this.Id;
    this.Type = Type_Physical;
    this.Name;
    this.State = State_Idle;
    this.IP;
    this.Url;
    this.Resources = [];
    this.Available = false;
}

function History() {
    this.Url;
    this.AgentId;
}


//Agent
function GenerateAgentView(agents, element) {
    var container = document.createElement('div');
    agents.forEach(function (agent) {
        var templateValue = AgentTemplate;
        for (var prop in agent) {
            if (agent.hasOwnProperty(prop)) {
                templateValue = templateValue.replace(new RegExp('\\${' + prop + '}', 'g'), agent[prop]);
            }
        }
        var denyValue = agent.Available ? 'hidden' : '';
        templateValue = templateValue.replace(/\${execDenyClass\(\)}/g, denyValue);

        var stateValue = agent.State == 0 ? 'idle' : 'building';
        var typeValue = agent.Type == 0 ? ' physical' : ' virtual';
        templateValue = templateValue.replace(/\${execStateValue\(\)}/g, stateValue);
        templateValue = templateValue.replace(/\${execStateClass\(\)}/g, stateValue + typeValue);

        var resourceValue = '';
        agent.Resources.forEach(function (value, index) {
            resourceValue += ResourceTemplate.replace(/\${template}/g, value);
        });
        templateValue = templateValue.replace(/\${execResource\(\)}/g, resourceValue);

        container.innerHTML += templateValue;
    });

    element.appendChild(container);
}

function OnSpecifyResource() {
    event.preventDefault();
    var popup = document.querySelector('.popup');
    popup.className = popup.className.replace(/hidden/g, '').trim(' ');
}

function OnAdd() {
    var inputValue = document.querySelector('.resource-input').value;
    // TODO: validate input value
    inputValue.split(',').forEach(function (value) {
        var div = document.createElement('div');
        div.className = 'resource';
        div.innerHTML = '<span class="resource-text">' + value + '</span><i class="remove"></i>';
        document.querySelector('.resource-container').appendChild(div);
    });
    document.querySelector('.resource-input').value = '';
    this.OnClose();
}

function OnClose() {
    document.querySelector('.popup').className += ' hidden';
}

var ResourceTemplate = '<div class="resource"><span class="resource-text">${template}</span><i class="remove"></i></div>';

//execDenyClass()
//execResource()
//execStateClass()
//execStateValue()
var AgentTemplate = '<div class="agent-info-container ${execStateClass()}"> \
                        <div class="circle-icon"></div> \
                        <div class="content-panel"> \
                            <div class="row"> \
                                <div class="agent-name col-md-6" title="${Name}">${Name}</div> \
                                <div class="rightTop-panel col-md-6" title="| ${execStateValue()} | ${IP} | ${Url}"> \
                                    | <span>${execStateValue()}</span> | <span>${IP}</span> | <span>${Url}</span> \
                                </div> \
                            </div> \
                            <div class="row"> \
                                <div onclick="OnSpecifyResource()" style="display:inline-block"> \
                                    <span class="plus">+</span> \
                                    <a href="" class="add-resource">Specify Resource</a> \
                                </div> \
                                <div class="resource-container"> \
                                    <span>| Resources:</span> \
                                    ${execResource()} \
                                </div> \
                            </div> \
                        </div> \
                        <div class="deny-container ${execDenyClass()}"> \
                            <i></i> \
                            <a href="">Deny</a> \
                        </div> \
                    </div> \
                    <div style="position:relative;"> \
                        <div class="popup hidden"> \
                            <i class="i1"> \
                                <i class="i2"> \
                                </i> \
                            </i> \
                            <div>(separate multiple resources name with commas)</div> \
                            <input class="resource-input" type="text"> \
                            <div class="btn-area"> \
                                <button onclick="OnAdd()">Add resources</button><button onclick="OnClose()">Close</button> \
                            </div> \
                        </div> \
                    </div> \
                    ';




// History
function GenerateHistoryView(histories, element) {
    var container = document.createElement('div');
    histories.forEach(function (history) {
        container.innerHTML += '<div class="history" title="' + history.Url + '">' + history.Url + '</div>';
    });
    element.appendChild(container);
}