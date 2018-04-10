var agent02 = new Agent();
agent02.Id = 1;
agent02.Name = 'bjstdmngbgr02.thoughtworks.com';
agent02.IP = '192.168.1.2';
agent02.Url = '/var/lib/cruise-agent';
agent02.Resources = ['ubuntu', 'firefox3', 'core-duo'];

var agent03 = new Agent();
agent03.Id = 2;
agent03.Name = 'bjstdmngbgr03.thoughtworks.com';
agent03.IP = '192.168.1.3';
agent03.Url = '/var/lib/cruise-agent';
agent03.Resources = ['ubuntu', 'firefox3', 'mysql', 'core-duo'];
agent03.State = 1;
agent03.Available = true;

var agent04 = new Agent();
agent04.Id = 3;
agent04.Name = 'bjstdmngbgr04.thoughtworks.com';
agent04.IP = '192.168.1.4';
agent04.Url = '/var/lib/cruise-agent';
agent04.Resources = ['ubuntu', 'firefox3', 'mysql', 'core-duo'];
agent04.State = 1;
agent04.Available = true;

var agent05 = new Agent();
agent05.Id = 4;
agent05.Name = 'bjstdmngbgr05.thoughtworks.com';
agent05.IP = '192.168.1.5';
agent05.Url = '/var/lib/cruise-agent';
agent05.Resources = ['ubuntu'];

var agents = [agent02, agent03, agent04, agent05];

var history = new History();
history.AgentId = agent02.Id;
history.Url = 'bjstdmngbgr02/Acceptance_test';

var jsonStr = JSON.stringify({ Agents: agents, History: [history, history, history, history, history, history, history, history, history, history] });
