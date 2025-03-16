"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4387],{4387:(t,e,n)=>{n.d(e,{diagram:()=>D});var i=n(8850),s=n(352),r=(n(9854),n(6113),n(373),n(6853),n(4078)),o=n(992),a=n(3219),c=n(8041),l=n(5263),h=function(){var t=(0,o.K2)((function(t,e,n,i){for(n=n||{},i=t.length;i--;n[t[i]]=e);return n}),"o"),e=[1,4],n=[1,13],i=[1,12],s=[1,15],r=[1,16],a=[1,20],c=[1,19],l=[6,7,8],h=[1,26],u=[1,24],g=[1,25],d=[6,7,11],p=[1,31],y=[6,7,11,24],f=[1,6,13,16,17,20,23],m=[1,35],b=[1,36],_=[1,6,7,11,13,16,17,20,23],k=[1,38],E={trace:(0,o.K2)((function(){}),"trace"),yy:{},symbols_:{error:2,start:3,mindMap:4,spaceLines:5,SPACELINE:6,NL:7,KANBAN:8,document:9,stop:10,EOF:11,statement:12,SPACELIST:13,node:14,shapeData:15,ICON:16,CLASS:17,nodeWithId:18,nodeWithoutId:19,NODE_DSTART:20,NODE_DESCR:21,NODE_DEND:22,NODE_ID:23,SHAPE_DATA:24,$accept:0,$end:1},terminals_:{2:"error",6:"SPACELINE",7:"NL",8:"KANBAN",11:"EOF",13:"SPACELIST",16:"ICON",17:"CLASS",20:"NODE_DSTART",21:"NODE_DESCR",22:"NODE_DEND",23:"NODE_ID",24:"SHAPE_DATA"},productions_:[0,[3,1],[3,2],[5,1],[5,2],[5,2],[4,2],[4,3],[10,1],[10,1],[10,1],[10,2],[10,2],[9,3],[9,2],[12,3],[12,2],[12,2],[12,2],[12,1],[12,2],[12,1],[12,1],[12,1],[12,1],[14,1],[14,1],[19,3],[18,1],[18,4],[15,2],[15,1]],performAction:(0,o.K2)((function(t,e,n,i,s,r,o){var a=r.length-1;switch(s){case 6:case 7:return i;case 8:i.getLogger().trace("Stop NL ");break;case 9:i.getLogger().trace("Stop EOF ");break;case 11:i.getLogger().trace("Stop NL2 ");break;case 12:i.getLogger().trace("Stop EOF2 ");break;case 15:i.getLogger().info("Node: ",r[a-1].id),i.addNode(r[a-2].length,r[a-1].id,r[a-1].descr,r[a-1].type,r[a]);break;case 16:i.getLogger().info("Node: ",r[a].id),i.addNode(r[a-1].length,r[a].id,r[a].descr,r[a].type);break;case 17:i.getLogger().trace("Icon: ",r[a]),i.decorateNode({icon:r[a]});break;case 18:case 23:i.decorateNode({class:r[a]});break;case 19:i.getLogger().trace("SPACELIST");break;case 20:i.getLogger().trace("Node: ",r[a-1].id),i.addNode(0,r[a-1].id,r[a-1].descr,r[a-1].type,r[a]);break;case 21:i.getLogger().trace("Node: ",r[a].id),i.addNode(0,r[a].id,r[a].descr,r[a].type);break;case 22:i.decorateNode({icon:r[a]});break;case 27:i.getLogger().trace("node found ..",r[a-2]),this.$={id:r[a-1],descr:r[a-1],type:i.getType(r[a-2],r[a])};break;case 28:this.$={id:r[a],descr:r[a],type:0};break;case 29:i.getLogger().trace("node found ..",r[a-3]),this.$={id:r[a-3],descr:r[a-1],type:i.getType(r[a-2],r[a])};break;case 30:this.$=r[a-1]+r[a];break;case 31:this.$=r[a]}}),"anonymous"),table:[{3:1,4:2,5:3,6:[1,5],8:e},{1:[3]},{1:[2,1]},{4:6,6:[1,7],7:[1,8],8:e},{6:n,7:[1,10],9:9,12:11,13:i,14:14,16:s,17:r,18:17,19:18,20:a,23:c},t(l,[2,3]),{1:[2,2]},t(l,[2,4]),t(l,[2,5]),{1:[2,6],6:n,12:21,13:i,14:14,16:s,17:r,18:17,19:18,20:a,23:c},{6:n,9:22,12:11,13:i,14:14,16:s,17:r,18:17,19:18,20:a,23:c},{6:h,7:u,10:23,11:g},t(d,[2,24],{18:17,19:18,14:27,16:[1,28],17:[1,29],20:a,23:c}),t(d,[2,19]),t(d,[2,21],{15:30,24:p}),t(d,[2,22]),t(d,[2,23]),t(y,[2,25]),t(y,[2,26]),t(y,[2,28],{20:[1,32]}),{21:[1,33]},{6:h,7:u,10:34,11:g},{1:[2,7],6:n,12:21,13:i,14:14,16:s,17:r,18:17,19:18,20:a,23:c},t(f,[2,14],{7:m,11:b}),t(_,[2,8]),t(_,[2,9]),t(_,[2,10]),t(d,[2,16],{15:37,24:p}),t(d,[2,17]),t(d,[2,18]),t(d,[2,20],{24:k}),t(y,[2,31]),{21:[1,39]},{22:[1,40]},t(f,[2,13],{7:m,11:b}),t(_,[2,11]),t(_,[2,12]),t(d,[2,15],{24:k}),t(y,[2,30]),{22:[1,41]},t(y,[2,27]),t(y,[2,29])],defaultActions:{2:[2,1],6:[2,2]},parseError:(0,o.K2)((function(t,e){if(!e.recoverable){var n=new Error(t);throw n.hash=e,n}this.trace(t)}),"parseError"),parse:(0,o.K2)((function(t){var e=this,n=[0],i=[],s=[null],r=[],a=this.table,c="",l=0,h=0,u=0,g=r.slice.call(arguments,1),d=Object.create(this.lexer),p={yy:{}};for(var y in this.yy)Object.prototype.hasOwnProperty.call(this.yy,y)&&(p.yy[y]=this.yy[y]);d.setInput(t,p.yy),p.yy.lexer=d,p.yy.parser=this,void 0===d.yylloc&&(d.yylloc={});var f=d.yylloc;r.push(f);var m=d.options&&d.options.ranges;function b(){var t;return"number"!=typeof(t=i.pop()||d.lex()||1)&&(t instanceof Array&&(t=(i=t).pop()),t=e.symbols_[t]||t),t}"function"==typeof p.yy.parseError?this.parseError=p.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError,(0,o.K2)((function(t){n.length=n.length-2*t,s.length=s.length-t,r.length=r.length-t}),"popStack"),(0,o.K2)(b,"lex");for(var _,k,E,S,N,x,D,L,I,C={};;){if(E=n[n.length-1],this.defaultActions[E]?S=this.defaultActions[E]:(null==_&&(_=b()),S=a[E]&&a[E][_]),void 0===S||!S.length||!S[0]){var O="";for(x in I=[],a[E])this.terminals_[x]&&x>2&&I.push("'"+this.terminals_[x]+"'");O=d.showPosition?"Parse error on line "+(l+1)+":\n"+d.showPosition()+"\nExpecting "+I.join(", ")+", got '"+(this.terminals_[_]||_)+"'":"Parse error on line "+(l+1)+": Unexpected "+(1==_?"end of input":"'"+(this.terminals_[_]||_)+"'"),this.parseError(O,{text:d.match,token:this.terminals_[_]||_,line:d.yylineno,loc:f,expected:I})}if(S[0]instanceof Array&&S.length>1)throw new Error("Parse Error: multiple actions possible at state: "+E+", token: "+_);switch(S[0]){case 1:n.push(_),s.push(d.yytext),r.push(d.yylloc),n.push(S[1]),_=null,k?(_=k,k=null):(h=d.yyleng,c=d.yytext,l=d.yylineno,f=d.yylloc,u>0&&u--);break;case 2:if(D=this.productions_[S[1]][1],C.$=s[s.length-D],C._$={first_line:r[r.length-(D||1)].first_line,last_line:r[r.length-1].last_line,first_column:r[r.length-(D||1)].first_column,last_column:r[r.length-1].last_column},m&&(C._$.range=[r[r.length-(D||1)].range[0],r[r.length-1].range[1]]),void 0!==(N=this.performAction.apply(C,[c,h,l,p.yy,S[1],s,r].concat(g))))return N;D&&(n=n.slice(0,-1*D*2),s=s.slice(0,-1*D),r=r.slice(0,-1*D)),n.push(this.productions_[S[1]][0]),s.push(C.$),r.push(C._$),L=a[n[n.length-2]][n[n.length-1]],n.push(L);break;case 3:return!0}}return!0}),"parse")},S=function(){return{EOF:1,parseError:(0,o.K2)((function(t,e){if(!this.yy.parser)throw new Error(t);this.yy.parser.parseError(t,e)}),"parseError"),setInput:(0,o.K2)((function(t,e){return this.yy=e||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this}),"setInput"),input:(0,o.K2)((function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t}),"input"),unput:(0,o.K2)((function(t){var e=t.length,n=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e),this.offset-=e;var i=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),n.length-1&&(this.yylineno-=n.length-1);var s=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:n?(n.length===i.length?this.yylloc.first_column:0)+i[i.length-n.length].length-n[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[s[0],s[0]+this.yyleng-e]),this.yyleng=this.yytext.length,this}),"unput"),more:(0,o.K2)((function(){return this._more=!0,this}),"more"),reject:(0,o.K2)((function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})}),"reject"),less:(0,o.K2)((function(t){this.unput(this.match.slice(t))}),"less"),pastInput:(0,o.K2)((function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")}),"pastInput"),upcomingInput:(0,o.K2)((function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")}),"upcomingInput"),showPosition:(0,o.K2)((function(){var t=this.pastInput(),e=new Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"}),"showPosition"),test_match:(0,o.K2)((function(t,e){var n,i,s;if(this.options.backtrack_lexer&&(s={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(s.yylloc.range=this.yylloc.range.slice(0))),(i=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=i.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:i?i[i.length-1].length-i[i.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],n=this.performAction.call(this,this.yy,this,e,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),n)return n;if(this._backtrack){for(var r in s)this[r]=s[r];return!1}return!1}),"test_match"),next:(0,o.K2)((function(){if(this.done)return this.EOF;var t,e,n,i;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var s=this._currentRules(),r=0;r<s.length;r++)if((n=this._input.match(this.rules[s[r]]))&&(!e||n[0].length>e[0].length)){if(e=n,i=r,this.options.backtrack_lexer){if(!1!==(t=this.test_match(n,s[r])))return t;if(this._backtrack){e=!1;continue}return!1}if(!this.options.flex)break}return e?!1!==(t=this.test_match(e,s[i]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})}),"next"),lex:(0,o.K2)((function(){var t=this.next();return t||this.lex()}),"lex"),begin:(0,o.K2)((function(t){this.conditionStack.push(t)}),"begin"),popState:(0,o.K2)((function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]}),"popState"),_currentRules:(0,o.K2)((function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules}),"_currentRules"),topState:(0,o.K2)((function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL"}),"topState"),pushState:(0,o.K2)((function(t){this.begin(t)}),"pushState"),stateStackSize:(0,o.K2)((function(){return this.conditionStack.length}),"stateStackSize"),options:{"case-insensitive":!0},performAction:(0,o.K2)((function(t,e,n,i){switch(n){case 0:return this.pushState("shapeData"),e.yytext="",24;case 1:return this.pushState("shapeDataStr"),24;case 2:return this.popState(),24;case 3:const n=/\n\s*/g;return e.yytext=e.yytext.replace(n,"<br/>"),24;case 4:return 24;case 5:case 10:case 29:case 32:this.popState();break;case 6:return t.getLogger().trace("Found comment",e.yytext),6;case 7:return 8;case 8:this.begin("CLASS");break;case 9:return this.popState(),17;case 11:t.getLogger().trace("Begin icon"),this.begin("ICON");break;case 12:return t.getLogger().trace("SPACELINE"),6;case 13:return 7;case 14:return 16;case 15:t.getLogger().trace("end icon"),this.popState();break;case 16:return t.getLogger().trace("Exploding node"),this.begin("NODE"),20;case 17:return t.getLogger().trace("Cloud"),this.begin("NODE"),20;case 18:return t.getLogger().trace("Explosion Bang"),this.begin("NODE"),20;case 19:return t.getLogger().trace("Cloud Bang"),this.begin("NODE"),20;case 20:case 21:case 22:case 23:return this.begin("NODE"),20;case 24:return 13;case 25:return 23;case 26:return 11;case 27:this.begin("NSTR2");break;case 28:return"NODE_DESCR";case 30:t.getLogger().trace("Starting NSTR"),this.begin("NSTR");break;case 31:return t.getLogger().trace("description:",e.yytext),"NODE_DESCR";case 33:return this.popState(),t.getLogger().trace("node end ))"),"NODE_DEND";case 34:return this.popState(),t.getLogger().trace("node end )"),"NODE_DEND";case 35:return this.popState(),t.getLogger().trace("node end ...",e.yytext),"NODE_DEND";case 36:case 39:case 40:return this.popState(),t.getLogger().trace("node end (("),"NODE_DEND";case 37:case 38:return this.popState(),t.getLogger().trace("node end (-"),"NODE_DEND";case 41:case 42:return t.getLogger().trace("Long description:",e.yytext),21}}),"anonymous"),rules:[/^(?:@\{)/i,/^(?:["])/i,/^(?:["])/i,/^(?:[^\"]+)/i,/^(?:[^}^"]+)/i,/^(?:\})/i,/^(?:\s*%%.*)/i,/^(?:kanban\b)/i,/^(?::::)/i,/^(?:.+)/i,/^(?:\n)/i,/^(?:::icon\()/i,/^(?:[\s]+[\n])/i,/^(?:[\n]+)/i,/^(?:[^\)]+)/i,/^(?:\))/i,/^(?:-\))/i,/^(?:\(-)/i,/^(?:\)\))/i,/^(?:\))/i,/^(?:\(\()/i,/^(?:\{\{)/i,/^(?:\()/i,/^(?:\[)/i,/^(?:[\s]+)/i,/^(?:[^\(\[\n\)\{\}@]+)/i,/^(?:$)/i,/^(?:["][`])/i,/^(?:[^`"]+)/i,/^(?:[`]["])/i,/^(?:["])/i,/^(?:[^"]+)/i,/^(?:["])/i,/^(?:[\)]\))/i,/^(?:[\)])/i,/^(?:[\]])/i,/^(?:\}\})/i,/^(?:\(-)/i,/^(?:-\))/i,/^(?:\(\()/i,/^(?:\()/i,/^(?:[^\)\]\(\}]+)/i,/^(?:.+(?!\(\())/i],conditions:{shapeDataEndBracket:{rules:[],inclusive:!1},shapeDataStr:{rules:[2,3],inclusive:!1},shapeData:{rules:[1,4,5],inclusive:!1},CLASS:{rules:[9,10],inclusive:!1},ICON:{rules:[14,15],inclusive:!1},NSTR2:{rules:[28,29],inclusive:!1},NSTR:{rules:[31,32],inclusive:!1},NODE:{rules:[27,30,33,34,35,36,37,38,39,40,41,42],inclusive:!1},INITIAL:{rules:[0,6,7,8,11,12,13,16,17,18,19,20,21,22,23,24,25,26],inclusive:!0}}}}();function N(){this.yy={}}return E.lexer=S,(0,o.K2)(N,"Parser"),N.prototype=E,E.Parser=N,new N}();h.parser=h;var u=h,g=[],d=[],p=0,y={},f=(0,o.K2)((()=>{g=[],d=[],p=0,y={}}),"clear"),m=(0,o.K2)((t=>{if(0===g.length)return null;const e=g[0].level;let n=null;for(let i=g.length-1;i>=0;i--)if(g[i].level!==e||n||(n=g[i]),g[i].level<e)throw new Error('Items without section detected, found section ("'+g[i].label+'")');return t===n?.level?null:n}),"getSection"),b=(0,o.K2)((function(){return d}),"getSections"),_=(0,o.K2)((function(){const t=[],e=b(),n=(0,o.D7)();for(const i of e){const e={id:i.id,label:(0,o.jZ)(i.label??"",n),isGroup:!0,ticket:i.ticket,shape:"kanbanSection",level:i.level,look:n.look};t.push(e);const s=g.filter((t=>t.parentId===i.id));for(const r of s){const e={id:r.id,parentId:i.id,label:(0,o.jZ)(r.label??"",n),isGroup:!1,ticket:r?.ticket,priority:r?.priority,assigned:r?.assigned,icon:r?.icon,shape:"kanbanItem",level:r.level,rx:5,ry:5,cssStyles:["text-align: left"]};t.push(e)}}return{nodes:t,edges:[],other:{},config:(0,o.D7)()}}),"getData"),k=(0,o.K2)(((t,e,n,s,r)=>{const a=(0,o.D7)();let c=a.mindmap?.padding??o.UI.mindmap.padding;switch(s){case E.ROUNDED_RECT:case E.RECT:case E.HEXAGON:c*=2}const l={id:(0,o.jZ)(e,a)||"kbn"+p++,level:t,label:(0,o.jZ)(n,a),width:a.mindmap?.maxNodeWidth??o.UI.mindmap.maxNodeWidth,padding:c,isGroup:!1};if(void 0!==r){let t;t=r.includes("\n")?r+"\n":"{\n"+r+"\n}";const e=(0,i.H)(t,{schema:i.r});if(e.shape&&(e.shape!==e.shape.toLowerCase()||e.shape.includes("_")))throw new Error(`No such shape: ${e.shape}. Shape names should be lowercase.`);e?.shape&&"kanbanItem"===e.shape&&(l.shape=e?.shape),e?.label&&(l.label=e?.label),e?.icon&&(l.icon=e?.icon.toString()),e?.assigned&&(l.assigned=e?.assigned.toString()),e?.ticket&&(l.ticket=e?.ticket.toString()),e?.priority&&(l.priority=e?.priority)}const h=m(t);h?l.parentId=h.id||"kbn"+p++:d.push(l),g.push(l)}),"addNode"),E={DEFAULT:0,NO_BORDER:0,ROUNDED_RECT:1,RECT:2,CIRCLE:3,CLOUD:4,BANG:5,HEXAGON:6},S={clear:f,addNode:k,getSections:b,getData:_,nodeType:E,getType:(0,o.K2)(((t,e)=>{switch(o.Rm.debug("In get type",t,e),t){case"[":return E.RECT;case"(":return")"===e?E.ROUNDED_RECT:E.CLOUD;case"((":return E.CIRCLE;case")":return E.CLOUD;case"))":return E.BANG;case"{{":return E.HEXAGON;default:return E.DEFAULT}}),"getType"),setElementForId:(0,o.K2)(((t,e)=>{y[t]=e}),"setElementForId"),decorateNode:(0,o.K2)((t=>{if(!t)return;const e=(0,o.D7)(),n=g[g.length-1];t.icon&&(n.icon=(0,o.jZ)(t.icon,e)),t.class&&(n.cssClasses=(0,o.jZ)(t.class,e))}),"decorateNode"),type2Str:(0,o.K2)((t=>{switch(t){case E.DEFAULT:return"no-border";case E.RECT:return"rect";case E.ROUNDED_RECT:return"rounded-rect";case E.CIRCLE:return"circle";case E.CLOUD:return"cloud";case E.BANG:return"bang";case E.HEXAGON:return"hexgon";default:return"no-border"}}),"type2Str"),getLogger:(0,o.K2)((()=>o.Rm),"getLogger"),getElementById:(0,o.K2)((t=>y[t]),"getElementById")},N={draw:(0,o.K2)((async(t,e,n,i)=>{o.Rm.debug("Rendering kanban diagram\n"+t);const a=i.db.getData(),c=(0,o.D7)();c.htmlLabels=!1;const l=(0,r.D)(e),h=l.append("g");h.attr("class","sections");const u=l.append("g");u.attr("class","items");const g=a.nodes.filter((t=>t.isGroup));let d=0;const p=[];let y=25;for(const r of g){const t=c?.kanban?.sectionWidth||200;d+=1,r.x=t*d+10*(d-1)/2,r.width=t,r.y=0,r.height=3*t,r.rx=5,r.ry=5,r.cssClasses=r.cssClasses+" section-"+d;const e=await(0,s.U)(h,r);y=Math.max(y,e?.labelBBox?.height),p.push(e)}let f=0;for(const r of g){const t=p[f];f+=1;const e=c?.kanban?.sectionWidth||200,n=3*-e/2+y;let i=n;const o=a.nodes.filter((t=>t.parentId===r.id));for(const a of o){if(a.isGroup)throw new Error("Groups within groups are not allowed in Kanban diagrams");a.x=r.x,a.width=e-15;const t=(await(0,s.on)(u,a,{config:c})).node().getBBox();a.y=i+t.height/2,await(0,s.U_)(a),i=a.y+t.height/2+5}const l=t.cluster.select("rect"),h=Math.max(i-n+30,50)+(y-25);l.attr("height",h)}(0,o.ot)(void 0,l,c.mindmap?.padding??o.UI.kanban.padding,c.mindmap?.useMaxWidth??o.UI.kanban.useMaxWidth)}),"draw")},x=(0,o.K2)((t=>{let e="";for(let i=0;i<t.THEME_COLOR_LIMIT;i++)t["lineColor"+i]=t["lineColor"+i]||t["cScaleInv"+i],(0,a.A)(t["lineColor"+i])?t["lineColor"+i]=(0,c.A)(t["lineColor"+i],20):t["lineColor"+i]=(0,l.A)(t["lineColor"+i],20);const n=(0,o.K2)(((e,n)=>t.darkMode?(0,l.A)(e,n):(0,c.A)(e,n)),"adjuster");for(let i=0;i<t.THEME_COLOR_LIMIT;i++){const s=""+(17-3*i);e+=`\n    .section-${i-1} rect, .section-${i-1} path, .section-${i-1} circle, .section-${i-1} polygon, .section-${i-1} path  {\n      fill: ${n(t["cScale"+i],10)};\n      stroke: ${n(t["cScale"+i],10)};\n\n    }\n    .section-${i-1} text {\n     fill: ${t["cScaleLabel"+i]};\n    }\n    .node-icon-${i-1} {\n      font-size: 40px;\n      color: ${t["cScaleLabel"+i]};\n    }\n    .section-edge-${i-1}{\n      stroke: ${t["cScale"+i]};\n    }\n    .edge-depth-${i-1}{\n      stroke-width: ${s};\n    }\n    .section-${i-1} line {\n      stroke: ${t["cScaleInv"+i]} ;\n      stroke-width: 3;\n    }\n\n    .disabled, .disabled circle, .disabled text {\n      fill: lightgray;\n    }\n    .disabled text {\n      fill: #efefef;\n    }\n\n  .node rect,\n  .node circle,\n  .node ellipse,\n  .node polygon,\n  .node path {\n    fill: ${t.background};\n    stroke: ${t.nodeBorder};\n    stroke-width: 1px;\n  }\n\n  .kanban-ticket-link {\n    fill: ${t.background};\n    stroke: ${t.nodeBorder};\n    text-decoration: underline;\n  }\n    `}return e}),"genSections"),D={db:S,renderer:N,parser:u,styles:(0,o.K2)((t=>`\n  .edge {\n    stroke-width: 3;\n  }\n  ${x(t)}\n  .section-root rect, .section-root path, .section-root circle, .section-root polygon  {\n    fill: ${t.git0};\n  }\n  .section-root text {\n    fill: ${t.gitBranchLabel0};\n  }\n  .icon-container {\n    height:100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  .edge {\n    fill: none;\n  }\n  .cluster-label, .label {\n    color: ${t.textColor};\n    fill: ${t.textColor};\n    }\n  .kanban-label {\n    dy: 1em;\n    alignment-baseline: middle;\n    text-anchor: middle;\n    dominant-baseline: middle;\n    text-align: center;\n  }\n`),"getStyles")}}}]);