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

    var areas = Array.prototype.slice.call(container.querySelectorAll('.agent-info-container .deny-area'));
    areas.forEach(function (area, index) {
        area.addEventListener('click', OnAreaClick, true);
    });

    function OnAreaClick(event) {
        if (event.currentTarget.parentElement.className.indexOf('denied') != -1) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
}

function OnSpecifyResource(agentIndex) {
    event.preventDefault();
    var popup = document.querySelector('.' + agentIndex + '.popup');
    popup.className = popup.className.replace(/hidden/g, '').trim(' ');
}

function OnAdd(agentIndex) {
    var agentIndexClass = '.' + agentIndex;
    var input = document.querySelector('.popup' + agentIndexClass + ' .resource-input');
    //Validate
    var labelText = document.querySelector('.popup' + agentIndexClass + ' .label-text');
    var errorText = document.querySelector('.popup' + agentIndexClass + ' .error-text');
    if (!/^(\w+)(, \w+)*$/.test(input.value)) {
        if (errorText.className.indexOf('display') == -1) {
            errorText.className += ' display';
            labelText.className += ' hidden';
        }
        return;
    }
    labelText.className = labelText.className.replace(/hidden|\s/g, '');
    errorText.className = errorText.className.replace(/display|\s/g, '');

    var self = this;
    input.value.split(', ').forEach(function (value) {
        var div = document.createElement('div');
        div.className = 'resource';
        div.addEventListener('click', function () {
            self.OnRemove(agentIndex)
        });
        div.innerHTML = '<span class="resource-text">' + value + '</span><i class="remove">+</i>';
        document.querySelector(agentIndexClass + ' .resource-container').appendChild(div);
    });
    input.value = '';
    this.OnClose(agentIndex);
}

function OnClose(agentIndex) {
    document.querySelector('.' + agentIndex + '.popup').className += ' hidden';
}

function OnRemove(agentIndex) {
    if (/remove/g.test(event.target.className)) {
        document.querySelector('.' + agentIndex + ' .resource-container').removeChild(event.currentTarget);
    }
}

function OnDenyClick(agentIndex) {
    event.preventDefault();
    var agentContainer = document.querySelector('.agent-info-container.' + agentIndex);
    if (/^denied|\sdenied\s|\sdenied$/g.test(agentContainer.className)) {
        agentContainer.className = agentContainer.className.replace(/^denied|\sdenied\s|\sdenied$/g, ' ');
    } else {
        agentContainer.className += ' denied';
    }
}

function getCurrentAgentIndexClass() {
    var indexArray = event.currentTarget.className.match(/agent\d/g);
    if (!indexArray || !indexArray.length || indexArray.length != 1) {
        throw 'cannot match agent index...'
    }
    return '.' + indexArray[0];
}

var ResourceTemplate = '<div class="resource" onclick="OnRemove(\'${index}\')"><span class="resource-text">${template}</span><i class="remove">+</i></div>';

//execDenyClass()
//execResource()
//execStateClass()
//execStateValue()
var AgentTemplate = '<div class="agent-info-container ${index} ${execStateClass()}"> \
                        <div class="deny-area col-md-11"> \
                            <div class="circle-icon"></div> \
                            <div class="content-panel"> \
                                <div class="row"> \
                                    <div class="agent-name col-md-6" title="${Name}">${Name}</div> \
                                    <div class="rightTop-panel col-md-6" title="| ${execStateValue()} | ${IP} | ${Url}"> \
                                        | <span>${execStateValue()}</span> | <span>${IP}</span> | <span>${Url}</span> \
                                    </div> \
                                </div> \
                                <div class="row"> \
                                    <div onclick="OnSpecifyResource(\'${index}\')" style="display:inline-block"> \
                                        <span class="plus">+</span> \
                                        <a href="" class="add-resource">Specify Resource</a> \
                                    </div> \
                                    <div class="resource-container"> \
                                        <span>| Resources:</span> \
                                        ${execResource()} \
                                    </div> \
                                </div> \
                            </div> \
                        </div> \
                        <div class="deny-container ${execDenyClass()}"> \
                            <i></i> \
                            <a href="" onclick="OnDenyClick(\'${index}\')">Deny</a> \
                        </div> \
                    </div> \
                    <div style="position:relative;"> \
                        <div class="popup hidden ${index}"> \
                            <i class="i1"> \
                                <i class="i2"> \
                                </i> \
                            </i> \
                            <div class="label-text" title="(separate multiple resources name with commas)">(separate multiple resources name with commas)</div> \
                            <div class="error-text">error format...add like this format 1, 2</div>\
                            <input class="resource-input" type="text"> \
                            <div class="btn-area"> \
                                <button onclick="OnAdd(\'${index}\')">Add resources</button><button onclick="OnClose(\'${index}\')">Close</button> \
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