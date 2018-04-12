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
    agents.forEach(function (agent, index) {
        var templateValue = AgentTemplate;
        var resourceValue = ResourceTemplate;

        for (var prop in agent) {
            if (agent.hasOwnProperty(prop)) {
                templateValue = templateValue.replace(new RegExp('\\${' + prop + '}', 'g'), agent[prop]);
            }
        }

        templateValue = templateValue.replace(/\${index}/g, 'agent' + index);
        resourceValue = resourceValue.replace(/\${index}/g, 'agent' + index);

        var denyValue = agent.Available ? 'hidden' : '';
        templateValue = templateValue.replace(/\${execDenyClass\(\)}/g, denyValue);

        var stateValue = agent.State == 0 ? 'idle' : 'building';
        var typeValue = agent.Type == 0 ? ' physical' : ' virtual';
        templateValue = templateValue.replace(/\${execStateValue\(\)}/g, stateValue);
        templateValue = templateValue.replace(/\${execStateClass\(\)}/g, stateValue + typeValue);

        var resultResource = '';
        agent.Resources.forEach(function (value, index) {
            resultResource += resourceValue.replace(/\${template}/g, value);
        });
        templateValue = templateValue.replace(/\${execResource\(\)}/g, resultResource);

        container.innerHTML += templateValue;
    });

    element.appendChild(container);
}

function OnSpecifyResource() {
    event.preventDefault();
    var agentIndexClass = this.getCurrentAgentIndexClass();
    var popup = document.querySelector('.popup' + agentIndexClass);
    popup.className = popup.className.replace(/hidden/g, '').trim(' ');
}

function OnAdd() {
    var agentIndexClass = this.getCurrentAgentIndexClass();
    var input = document.querySelector(agentIndexClass + ' .resource-input');
    //Validate
    var inputCopy = input.value;
    inputCopy = inputCopy.replace(/,|\s/g, '');
    if(inputCopy == '' || /\W/.test(inputCopy)){
        throw 'error format...';
    }
    var self = this;
    input.value.split(',').forEach(function (value) {
        var div = document.createElement('div');
        div.className = 'resource ' + agentIndexClass.replace(/\./, '');
        div.addEventListener('click', function () {
            if (/remove/g.test(event.target.className)) {
                var agentIndexClass = self.getCurrentAgentIndexClass();
                document.querySelector('.resource-container' + agentIndexClass).removeChild(event.currentTarget);
            }
        });
        div.innerHTML = '<span class="resource-text">' + value + '</span><i class="remove">+</i>';
        document.querySelector('.resource-container' + agentIndexClass).appendChild(div);
    });
    input.value = '';
    this.OnClose();
}

function OnClose() {
    var agentIndexClass = this.getCurrentAgentIndexClass();
    document.querySelector('.popup' + agentIndexClass).className += ' hidden';
}

function OnRemove() {
    if (/remove/g.test(event.target.className)) {
        var agentIndexClass = this.getCurrentAgentIndexClass();
        document.querySelector('.resource-container' + agentIndexClass).removeChild(event.currentTarget);
    }
}

function getCurrentAgentIndexClass() {
    var indexArray = event.currentTarget.className.match(/agent\d/g);
    if (!indexArray || !indexArray.length || indexArray.length != 1) {
        throw 'cannot match agent index...'
    }
    return '.' + indexArray[0];
}

var ResourceTemplate = '<div class="resource ${index}" onclick="OnRemove()"><span class="resource-text">${template}</span><i class="remove">+</i></div>';

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
                                <div onclick="OnSpecifyResource()" style="display:inline-block" class="${index}"> \
                                    <span class="plus">+</span> \
                                    <a href="" class="add-resource">Specify Resource</a> \
                                </div> \
                                <div class="resource-container ${index}"> \
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
                        <div class="popup hidden ${index}"> \
                            <i class="i1"> \
                                <i class="i2"> \
                                </i> \
                            </i> \
                            <div>(separate multiple resources name with commas)</div> \
                            <input class="resource-input" type="text"> \
                            <div class="btn-area"> \
                                <button onclick="OnAdd()" class="${index}">Add resources</button><button onclick="OnClose()" class="${index}">Close</button> \
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