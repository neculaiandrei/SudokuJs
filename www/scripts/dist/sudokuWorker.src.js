define("cell",[],function(){var r=function(r,e,n){var t,o=[0,0,0,0,0,0,0,0,0,0],u={},i=function(){var r,e=[];for(r=1;9>=r;r++)0==o[r]&&e.push(r);return e},s=function(){return t},f=function(u){return o[u]?0:(t&&n.publish("numberChanged-"+r+e,[t,-1]),u&&n.publish("numberChanged-"+r+e,[u,1]),t=u,1)},a=function(r){var e,n;e=r[0],n=r[1],o[e]+=n},l=function(){var e;for(e=0;9>e;e++)n.subscribe("numberChanged-"+r+e,u.handleChange)},c=function(){var r;for(r=0;9>r;r++)n.subscribe("numberChanged-"+r+e,u.handleChange)},b=function(){var t,o,i,s;for(t=3*Math.floor(r/3),o=3*Math.floor(e/3),i=t;t+3>i;i++)for(s=o;o+3>s;s++)n.subscribe("numberChanged-"+i+s,u.handleChange)};return u={getPossibleNumbers:i,getNumber:s,setNumber:f,handleChange:a},l(),c(),b(),u};return r}),define("pubsub",[],function(){var r=function(){var r={};return{publish:function(e){var n=[].slice.call(arguments,1);r[e]||(r[e]=[]);for(var t=0,o=r[e].length;o>t;t++)r[e][t].apply(null,n)},subscribe:function(e,n){r[e]?r[e].push(n):r[e]=[n]}}};return r}),Array.prototype.getRandomValue=function(){return this[Math.floor(Math.random()*this.length)]},Array.prototype.shuffle=function(){for(var r,e,n=this.length;n;r=Math.floor(Math.random()*n),e=this[--n],this[n]=this[r],this[r]=e);},Array.prototype.pushIfNotExists=function(r){-1==this.indexOf(r)&&this.push(r)},define("arrayExtensions",function(){}),define("board",["./cell","./pubsub","./arrayExtensions"],function(r,e){var n=function(n){var t,o,u=function(){o=e(),i(),n&&s(n)},i=function(){var e,n;for(t=[],e=0;9>e;e++)for(t[e]=[],n=0;9>n;n++)t[e][n]=r(e,n,o)},s=function(r){var e,n;for(e=0;9>e;e++)for(n=0;9>n;n++)t[e][n].setNumber(r.cells[e][n].getNumber())},f=function(){var r,e;for(r=0;9>r;r++)for(e=0;9>e;e++)if(!t[r][e].getNumber())return!1;return!0};return u(),{cells:t,isFull:f}};return n}),define("boardSolver",["./board"],function(r){var e=function(e){var n,t,o,u,i=function(){n=e,t=[]},s=function(r){return o=r,u=!1,t=[],a(),t},f=function(){u=!0},a=function(){var e,i,s,f;if(!u){if(i=findFirstEmptyCellWithFewestPossibilities(),!i)return s=r(o),t.push(s),n.numberOfSolutions==t.length;for(f=i.getPossibleNumbers(),e=0;e<f.length;e++){if(i.setNumber(f[e]),a())return i.setNumber(),!0;i.setNumber()}}};return findFirstEmptyCellWithFewestPossibilities=function(){var r,e,n,t,u=10;for(r=0;9>r;r++)for(e=0;9>e;e++)n=o.cells[r][e],n.getNumber()||n.getPossibleNumbers().length<u&&(t=n,u=n.getPossibleNumbers().length);return t},i(),{settings:n,solve:s,cancel:f}}({numberOfSolutions:1});return e}),define("boardGenerator",["./boardSolver","./board"],function(r,e){var n=function(){var n,t,o,u,i=function(){u=!0},s=function(r){return u=!1,f(),l(),o.shuffle(),c(0,r,81),t},f=function(){var o=e();t=e(),a(o),r.settings.numberOfSolutions=1,n=r.solve(o)[0]},a=function(r){var e,n;for(e=0;9>e;e++)n=r.cells[0][e],n.setNumber(n.getPossibleNumbers().getRandomValue())},l=function(){var r,e;for(o=[],r=0;9>r;r++)for(e=0;9>e;e++)o[9*r+e]={row:r,column:e}},c=function(i,s,f){var a,l,b,m,h;if(!u){if(s==f)return t=e(n),!0;for(a=i;81>a;a++){if(l=o[a],b=n.cells[l.row][l.column],m=b.getNumber(),b.setNumber(),r.settings.numberOfSolutions=2,h=r.solve(n).length,1==h&&c(a+1,s,f-1))return b.setNumber(m),!0;b.setNumber(m)}}};return{cancel:i,generate:s}}();return n}),define("boardMapper",[],function(){var r=function(){var r=function(r,e){var n;for(n=0;81>n;n++)e[n]&&r.cells[Math.floor(n/9)][n%9].setNumber(e[n])},e=function(r){var e,n,t=[];for(e=0;9>e;e++)for(n=0;9>n;n++)t[9*e+n]=r.cells[e][n].getNumber();return t},n=function(e,n){var t,o=[];for(t=0;81>t;t++)if("."!=n[t])o[t]=n[t];else{if("."!=n[t])throw"Not valid word";o[t]=void 0}r(e,o)},t=function(r){var n,t,o=[];for(t=e(r),n=0;81>n;n++)o[n]=t[n]?t[n]:".";return o};return{mapFromArray:r,mapFromString:n,mapToArray:e,mapToString:t}}();return r}),importScripts("../libs/require.min.js"),require({baseUrl:"./"},["require","./boardGenerator","./boardSolver","./boardMapper","./board"],function(r,e,n,t,o){self.onmessage=function(r){var u,i,s;switch(i=r.data,i.cmd){case"generate":u=e.generate(i.difficulty),self.postMessage({cmd:i.cmd,board:t.mapToString(u)});break;case"solve":u=o(),t.mapFromString(u,i.board),n.settings.numberOfSolutions=parseInt(i.numberOfSolutions),s=n.solve(u),u=s[0],self.postMessage({cmd:i.cmd,board:t.mapToString(u),numberOfSolutions:s.length})}}}),define("sudokuWorker.src",function(){});