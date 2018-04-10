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

// Agent.prototype.ConvertToUIEntity = function () {
//     if(this instanceof Agent) {
//         this.Type = this._type == 0 ? 'Physical' : 'Virtual';
//         this.State = this._State == 0 ? 'Idle' : 'Building';
//     }
// }