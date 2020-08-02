(this["webpackJsonpfreboard-ts"]=this["webpackJsonpfreboard-ts"]||[]).push([[0],{20:function(e,t){(function(){var t,n,a=[].slice;n=new(t=function(){var e;return e={},{sub:function(t,n){var a,r,o,i,s;for(a=t.split(" "),e,s=[],o=0,i=a.length;o<i;o++)r=a[o],e[r]||(e[r]=[]),s.push(e[r].push(n));return s},pub:function(){var t,n,r,o,i;if(n=(t=1<=arguments.length?a.call(arguments,0):[]).shift(),e[n]){for(r=0,o=(i=e[n]).length;r<o&&!1!==i[r].apply(null,t);r++);return!0}},unsub:function(t,n){var a,r,o,i,s,c,l;for(l=[],s=0,c=(a=t.split(" ")).length;s<c;s++)i=a[s],(o=e[i])&&(n?l.push(function(){var t,a,s;for(s=[],r=t=0,a=o.length;t<a;r=++t)if(o[r]===n){(o=o.slice()).splice(r,1),e[i]=o;break}return s}()):delete e[i]);return l},callbacks_map:function(){return e}}}),e.exports={emitter:n,Emitter:t}}).call(this)},29:function(e,t,n){e.exports=n(56)},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},56:function(e,t,n){"use strict";n.r(t);var a,r,o,i,s,c,l,u,f,p,d,h,m,g,v,y,b,S=n(0),N=n.n(S),E=n(19),_=n.n(E),M=(n(34),n(35),n(36),n(37),n(6)),x=n(5),j=n(13),w=n(14),k=n(2),O=(a=Array.from(b=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]),(r=Object(k.a)(a,12))[0],r[1],r[2],r[3],r[4],r[5],r[6],r[7],r[8],r[9],r[10],r[11],b),P=(o=Array.from(b=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"]),u=(i=Object(k.a)(o,12))[0],f=i[1],p=i[2],d=i[3],h=i[4],m=i[5],g=i[6],v=i[7],y=i[8],s=i[9],c=i[10],l=i[11],b),D={Standard:{name:"Standard E",notes:[h,l,v,p,s,h],offset:[0,0,0,0,0,0]},DropD:{name:"Dropped D",notes:[h,l,v,p,s,p],offset:[0,0,0,0,0,-2]},"1StepDown":{name:"1 step down",notes:[d,c,g,f,y,d],offset:[-1,-1,-1,-1,-1,-1]},DropC:{name:"Dropped C",notes:[p,s,m,u,v,u],offset:[-2,-2,-2,-2,-2,-4]}},C=function(e,t){for(var n=0;n<t.length;n++){if(e===t[n])return n}return-1},A=function(e,t){return e===t.length-1?0:e+1},X=function(e,t,n,a){return[[]].concat(function(){for(var r=[],o=function(e,o,i){var s=function(e,t){var n=C(e,t);return function(){var e=n;return n=A(n,t),t[e]}}(n[e],a);r.push(function(e,t,n){for(var a=[],r=e<t,o=n?r?t+1:t-1:t,i=e;r?i<o:i>o;r?i++:i--)a.push(i);return a}(0,t,!0).map((function(){return s()})))},i=0,s=e-1,c=0<=s;c?i<=s:i>=s;c?i++:i--)o(i);return r}())};var F=n(7),R=function(e,t,n){var a,r=[{name:t,degree:1,scaleName:"Root",offset:0}];a=C(t,e);var o=0,i=0;return r.concat(function(){for(var t=[],r=0,s=Array.from(n.size);r<s.length;r++){var c=s[r];i+=c,F.times(c,(function(){a=A(a,e)})),t.push({name:e[a],degree:o+2,scaleName:n.names[o],offset:i}),o++}return t}())},W=function(e,t){var n=R(O,e,t),a=R(P,e,t);return console.log({Note:e}),e.includes("b")?{scale:a,notes:P}:e.includes("#")||function(e){return F.uniq(e.map((function(e){return e.name[0]}))).length===e.length}(n)?{scale:n,notes:O}:{scale:a,notes:P}},z={Major:{desc:"Major scale",size:[2,2,1,2,2,2,1],names:["Major 2nd","Major 3rd","Perfect 4th","Perfect 5th","Major 6th","Major 7th","Octave"],get_notes:function(e){return W(e,z.Major)}},Minor:{desc:"Minor scale",names:["Major 2nd","Minor 3rd","Perfect 4th","Perfect 5th","Minor 6th","Minor 7th","Octave"],size:[2,1,2,2,1,2,2],get_notes:function(e){return W(e,z.Minor)}},Arabic:{desc:"Arabic scale",names:[],size:[1,3,1,1,3,1,2],get_notes:function(e){return W(e,z.Arabic)}},Blues:{desc:"Blues scale",names:[],size:[3,2,1,1,3,2],get_notes:function(e){return W(e,z.Blues)}},PentatonicMinor:{desc:"Pentatonic Minor",names:["Minor 3rd","Perfect 4th","Perfect 5th","Minor 7th","Octave"],size:[3,2,2,3,2],get_notes:function(e){return W(e,z.PentatonicMinor)}},PentatonicMajor:{desc:"Pentatonic Major",names:["Major 3rd","Perfect 4th","Perfect 5th","Major 7th","Octave"],size:[2,2,3,2,3],get_notes:function(e){return W(e,z.PentatonicMajor)}},MajorArpeggio:{desc:"Major Arpeggio",names:["Major 3rd","Perfect 5th","Octave"],size:[4,3,5],get_notes:function(e){return W(e,z.MajorArpeggio)}},MinorArpeggio:{desc:"Minor Arpeggio",names:["Minor 3rd","Perfect 5th","Octave"],size:[3,4,5],get_notes:function(e){return W(e,z.MinorArpeggio)}}},T=n(17),G=n(28),L=n(20),B=function(e){Object(w.a)(n,e);var t=Object(j.a)(n);function n(e){var a;return Object(M.a)(this,n),(a=t.call(this,e)).state={},a.elRef=void 0,a.turnOnLoader=function(){return a.setState({loader:!0})},a.turnOffLoader=function(){return a.setState({loader:!1})},a.onMouseDown=function(e){var t;if(0===e.button){var n=(null===(t=a.elRef.current)||void 0===t?void 0:t.offsetLeft)||0,r=e.pageX-n;return a.setState({dragging:!0,relx:r}),console.log({left:n,relx:r,dragging:!0}),e.stopPropagation(),e.preventDefault()}},a.onMouseUp=function(e){return a.setState({dragging:!1}),e.stopPropagation(),e.preventDefault()},a.onMouseMove=function(e){if(a.state.dragging){var t={},n=e.pageX-a.state.relx,r=a.props,o=r.minX,i=r.maxX,s=r.useX;return n>=o&&n<=i?t.x=n:n<=o?t.x=o:n>=i&&(t.x=i),console.log({pos:t,newX:n,minX:o,maxX:i,useX:s,ch:a.props.onXChange}),"function"===typeof a.props.onXChange&&a.props.onXChange(t.x),a.setState({pos:t}),e.stopPropagation(),e.preventDefault()}console.log("not draggin")},a.elRef=N.a.createRef(),a.state={pos:e.initialPos||{x:0,y:0},dragging:!1,relx:0,loader:!!e.loader,loaderFontSize:20},a}return Object(x.a)(n,[{key:"componentDidMount",value:function(){return L.emitter.sub("EVENT_SOUNDS_LOADING_START",this.turnOnLoader),L.emitter.sub("EVENT_SOUNDS_LOADING_STOP",this.turnOffLoader)}}]),Object(x.a)(n,[{key:"render",value:function(){return N.a.createElement("div",{ref:this.elRef,className:"col-md-4 selector",style:{height:this.props.height,width:this.props.width,left:"".concat(this.state.pos.x,"px"),top:"".concat(this.state.pos.y,"px"),position:"absolute"},onMouseDown:this.onMouseDown,onMouseUp:this.onMouseUp},N.a.createElement("div",{style:{width:"100%",height:"100%",background:"black",textAlign:"center",position:"relative",opacity:.5,paddingTop:"".concat(this.props.height/2-this.state.loaderFontSize,"px"),display:this.state.loader?"block":"none"}},N.a.createElement("span",{style:{opacity:1,color:"white",fontSize:"".concat(this.state.loaderFontSize,"px"),fontStyle:"italic"}},"loading")))}},{key:"componentDidUpdate",value:function(e,t){return this.state.dragging&&!t.dragging?(document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("mouseup",this.onMouseUp)):this.state.dragging&&t.dragging?void 0:(document.removeEventListener("mousemove",this.onMouseMove),document.removeEventListener("mouseup",this.onMouseUp))}}]),n}(N.a.Component),U=function(e,t,n,a,r,o,i,s){return a||(a=!1),r||(r=!1),o||(o=!1),i||(i=!1),s||(s=!1),{data:function(){return{sNum:e,fNum:t,note:n,checked:a,playing:r,selected:o,root_note:i,is_open:s}},playStart:function(){return r=!0},playStop:function(){return r=!1},check:function(){return a=!0},uncheck:function(){return a=!1},select:function(){return o=!0},unselect:function(){return o=!1},set_root:function(){return i=!0},set_open:function(){return s=!0}}},H=function(e){var t="",n="fret",a=e.data.checked?"on shadow":"off";e.data.checked&&e.data.selected&&(a="on-selected shadow"),e.data.root_note&&(a="on-selected-root shadow"),e.data.checked&&(t=e.data.note);var r=e.data.playing?"playing":"";return e.data.is_open&&(e.data.checked||(a="".concat(a," open shadow")),t=e.data.note,n=""),N.a.createElement("div",{className:"col-md-1 ".concat(n," padding0"),style:{width:e.width,height:e.height}},N.a.createElement("span",{className:"string"}),N.a.createElement("span",{className:"circleBase ".concat(a," ").concat(r)},t))},I=function(e){var t,n=function(t){return N.a.createElement(H,{key:"fret_".concat(t.data().sNum).concat(t.data().fNum),data:t.data(),width:e.Fwidth,height:e.Fheight})},a=[function(){var a=[];for(var r in e.data.frets)t=e.data.frets[r],a.push(n(t));return a}()];return N.a.createElement("div",{className:"row"},a)},J=n(16),V=n(9),q=n(10),$=n(22),K=n.n($),Q=new K.a.Howl({src:"./resources/cowbell.wav"});function Y(){Q.play()}var Z=function(e){Object(w.a)(n,e);var t=Object(j.a)(n);function n(e){var a;Object(M.a)(this,n),(a=t.call(this,e)).jsGuitarRef=void 0,a.displayRef=void 0,a.playScaleHelper=function(e){var t=e.firstTime,n=z[a.props.Scale].get_notes(a.props.Note),r=n.scale,o=n.notes,i=X(a.state.stringsNum,a.state.fretsNum,a.props.tuning.notes,o),s=!t,c=Object(T.a)(a),l=a.get_selected_frets();return t||l.shift(),G.a.mapSeries(l,(function(e,t){var n=Object(k.a)(e,2),o=n[0],l=n[1],u=i[o][l],f=F.find(r,(function(e){return e.name===u}));console.log(a.state.direction);var p="DOWN"===a.state.direction?"+".concat(f.offset):"-".concat(0===f.offset?0:12-f.offset);if(a.displayRef.current.innerHTML="".concat(f.name," - ").concat(f.scaleName," ").concat(p),c.state.is_playing){if(!s){if(0!==f.offset)return void t();s=!0}console.log("doing the thing at ",{sNum:o,fNum:l}),c.startPlayFret([o,l]),Y(),setTimeout(t,6e4/a.props.bpm)}else console.log("not playing anymore so canceling"),c.setState({playing_fret:void 0}),t("stop")}),(function(e){if(c.state.is_playing)return c.state.changeDirection&&c.toggleDirection(),c.state.repeat?c.playScale({intro:!1}):c.setState({is_playing:!1})}))},a.get_frets=function(){var e=z[a.props.Scale].get_notes(a.props.Note),t=e.scale,n=e.notes,r=X(a.state.stringsNum,a.state.fretsNum,a.props.tuning.notes,n),o=function(e,t,n){for(var a={},r=1,o=e,i=1<=o;i?r<=o:r>=o;i?r++:r--){a[r]={};for(var s=0,c=t,l=0<=c;l?s<=c:s>=c;l?s++:s--)a[r][s]=U(r,s,n[r][s],!1,!1)}return a}(a.state.stringsNum,a.state.fretsNum,r),i=a.state.selectorFretsCount*a.props.fretWidth;if(!a.state.selector.initialPos)return o;var s=a.state.selectorX;return F.each(o,(function(e,n){for(var r in e){var o,c,l,u=e[r],f=((null===(o=a.state.selector)||void 0===o||null===(c=o.initialPos)||void 0===c?void 0:c.x)||0)+r*a.props.fretWidth;if(f>=s&&f<s+i&&u.select(),u.data().note===a.props.Note&&u.set_root(),a.state.playing_fret&&a.state.is_playing){var p=Array.from(a.state.playing_fret),d=Object(k.a)(p,2),h=d[0],m=d[1];h===n&&m===r&&u.playStart()}l=u.data().note,Array.from(t.map((function(e){return e.name}))).includes(l)&&u.check(),"0"===r&&u.set_open()}})),o},a.togglePlayPause=function(){a.state.is_playing?a.stopPlayScale():a.playScale({intro:!0})},a.displayRef=N.a.createRef();var r,o=(null!=e.data?e.data.stringsNum:void 0)||6,i=(null!=e.data?e.data.fretsNum:void 0)||16,s=e.selectorFretsCount||4,c=s*e.fretWidth;return a.jsGuitarRef=N.a.createRef(),r={height:o*e.fretHeight,width:c,onXChange:function(e){return a.onSelectorMove(e)},minX:20,maxX:-1},a.state={stringsNum:o,fretsNum:i,timeout:400,selector:r,is_playing:!1,selectorFretsCount:s,direction:"DOWN",repeat:!0,changeDirection:!0,playing_fret:void 0,selectorX:0},document.addEventListener("keydown",(function(e){" "===e.key&&a.togglePlayPause()})),a}return Object(x.a)(n,[{key:"startPlayFret",value:function(e){return this.setState({playing_fret:e})}},{key:"countOff",value:function(e){var t=this,n=0;!function a(){Y(),n++,t.displayRef.current.innerHTML=n.toString(),8===n?setTimeout(e,6e4/t.props.bpm):setTimeout(a,6e4/t.props.bpm)}()}},{key:"playScale",value:function(e){var t=this,n=e.intro;console.log("setting playing to true"),this.setState({is_playing:!0},(function(){n?t.countOff((function(){return t.playScaleHelper({firstTime:!0})})):t.playScaleHelper({firstTime:!1})}))}},{key:"stopPlayScale",value:function(){return this.setState({is_playing:!1})}},{key:"toggleDirection",value:function(){return"UP"===this.state.direction?this.setState({direction:"DOWN"}):this.setState({direction:"UP"})}},{key:"get_selected_frets",value:function(){var e,t,n,a=this,r=[],o=function(){var e=[],t=a.get_frets();return F.each(t,(function(t,n){e.push([t,n])})),e}();"DOWN"===this.state.direction&&(o=o.reverse());for(var i=function(){var o=Object(k.a)(c[s],2);t=o[0],e=o[1];var i=void 0,l=[];F.each(t,(function(e,t){l.push([e,t])})),"UP"===a.state.direction&&(l=l.reverse());for(var u=0,f=Array.from(l);u<f.length;u++){var p=Object(k.a)(f[u],2);n=p[0],i=p[1],n.data().selected&&n.data().checked&&r.push([e,i])}},s=0,c=Array.from(o);s<c.length;s++)i();return r}},{key:"componentDidMount",value:function(){if(this.jsGuitarRef.current){var e=this.state.selectorFretsCount*this.props.fretWidth,t=this.state.selector,n=this.jsGuitarRef.current.offsetLeft;return t.initialPos={x:n,y:this.jsGuitarRef.current.offsetTop},t.minX=n,t.maxX=n+(this.state.fretsNum+1)*this.props.fretWidth-e,this.setState({selector:t,selectorX:n})}}}]),Object(x.a)(n,[{key:"onSelectorMove",value:function(e){return this.setState({selectorX:e,is_playing:!1})}},{key:"render",value:function(){var e=this,t=this.get_frets(),n=ee(0,this.state.stringsNum,!0).map((function(n){return N.a.createElement(I,{key:"string_item_".concat(n),data:{frets:t[n]},Fwidth:e.props.fretWidth,Fheight:e.props.fretHeight})})),a=e.state.selector.initialPos?e.state.selector?N.a.createElement(B,e.state.selector):void 0:N.a.createElement("div",null),r=[3,5,7,9,15,17,19],o=N.a.createElement("div",{className:"row",style:{margin:0}},ee(0,this.state.fretsNum,!0).map((function(t){return N.a.createElement("div",{key:"fret_dot_".concat(t),className:"col-md-1 fretdot",style:{textAlign:"left",width:"".concat(e.props.fretWidth,"px"),right:"9px",fontSize:"x-large"}},r.includes(t)&&"\u2022",12===t&&"\u2022\u2022")}))),i=N.a.createElement("div",{className:"row",style:{margin:0}},ee(0,this.state.fretsNum,!0).map((function(t){var n="",a=e.state.selectorX;if(a){var r,o=e.state.selectorFretsCount*e.props.fretWidth,i=((null===(r=e.state.selector.initialPos)||void 0===r?void 0:r.x)||0)+t*e.props.fretWidth;i>=a&&i<a+o&&(n="active-num")}return N.a.createElement("div",{key:"fret_num_".concat(t),className:"col-md-1 fretnum ".concat(n),style:{width:"".concat(e.props.fretWidth,"px")}},t)})));return N.a.createElement("div",{style:{width:(this.state.fretsNum+1)*this.props.fretWidth,margin:"auto"}},N.a.createElement("div",{className:"js-guitar",ref:this.jsGuitarRef},a,n,o,i),N.a.createElement("div",{style:{width:"100%",alignItems:"center",justifyContent:"center",alignContent:"center",display:"flex",paddingTop:"20px"}},N.a.createElement(J.a,{variant:"outline-primary",className:this.state.is_playing?"active":"",onClick:this.togglePlayPause},this.state.is_playing?N.a.createElement(V.a,{icon:q.f}):N.a.createElement(V.a,{icon:q.c})),N.a.createElement(J.a,{variant:"outline-primary",className:this.state.repeat?"active":"",onClick:function(){return e.setState({repeat:!e.state.repeat})}},N.a.createElement(V.a,{icon:q.e})),N.a.createElement(J.a,{variant:"outline-primary",className:"UP"===this.state.direction?"active":"",onClick:function(){return e.toggleDirection()}},"UP"===this.state.direction?N.a.createElement(V.a,{icon:q.a}):N.a.createElement(V.a,{icon:q.b})),N.a.createElement(J.a,{variant:"outline-primary",className:this.state.changeDirection?"active":"",onClick:function(){return e.setState({changeDirection:!e.state.changeDirection})}},N.a.createElement(V.a,{icon:q.d}))),N.a.createElement("h1",{ref:this.displayRef,style:{justifyContent:"center",alignItems:"center",alignContent:"center",width:"100%",backgroundColor:"beige",padding:"20px",fontSize:"xx-large",display:this.state.is_playing?"flex":"none"}},"xxxx"))}}]),n}(N.a.Component);function ee(e,t,n){for(var a=[],r=e<t,o=n?r?t+1:t-1:t,i=e;r?i<o:i>o;r?i++:i--)a.push(i);return a}var te,ne=n(24),ae=n.n(ne),re=["C","C#","Db","D","D#","Eb","E","Fb","F","F#","Gb","G","G#","Ab","A","A#","Bb","B","Cb"].map((function(e){return{value:e,label:e}})),oe=function(){var e=[];for(var t in z)e.push({value:t,label:t});return e}(),ie=(function(){var e=[];for(te in D){var t=D[te];e.push({value:te,label:t.name})}}(),function(e){Object(w.a)(n,e);var t=Object(j.a)(n);function n(){var e;Object(M.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={Note:"C",Scale:"Major",tuning:"Standard",bpm:80},e}return Object(x.a)(n,[{key:"render",value:function(){var e,t=this,n=D[this.state.tuning].name;return N.a.createElement("div",null,N.a.createElement("div",null,N.a.createElement("h2",{className:"text-center"},"".concat(this.state.Note," ").concat(this.state.Scale," (").concat(n," tuning)")),N.a.createElement("p",{className:"text-center text-muted text-bold"},(e=z[this.state.Scale].size,function(){for(var t=[],n=0,a=Array.from(e);n<a.length;n++){var r=a[n];2===r?t.push("Step"):1===r?t.push("hStep"):3===r?t.push("BigSTEP"):t.push("+".concat(r))}return t}().join(" - "))),N.a.createElement("p",{className:"text-center text-bold"},"".concat(z[this.state.Scale].get_notes(this.state.Note).scale.map((function(e){return e.name})).join(" "))),N.a.createElement("div",null,N.a.createElement("div",{style:{width:"850px",margin:"auto"}},N.a.createElement("div",{style:{display:"flex",flexDirection:"row",zIndex:1e4,paddingBottom:"20px"}},N.a.createElement("div",{style:{width:"100px"}},N.a.createElement(ae.a,{options:re,placeholder:"note",searchable:!1,values:[{value:this.state.Note,label:this.state.Note}],onChange:function(e){return t.setState({Note:e[0].value})}})),N.a.createElement("div",{style:{width:"250px"}},N.a.createElement(ae.a,{options:oe,placeholder:"scale",searchable:!1,values:[{value:this.state.Scale,label:this.state.Scale}],onChange:function(e){console.log(e),t.setState({Scale:e[0].value})}})),N.a.createElement("input",{value:this.state.bpm,onChange:function(e){return t.setState({bpm:Number(e.target.value)})}}))),N.a.createElement(Z,{bpm:this.state.bpm,fretWidth:50,fretHeight:30,selectorFretsCount:4,Note:this.state.Note,Scale:this.state.Scale,tuning:D[this.state.tuning]}))))}}]),n}(N.a.Component));var se=function(){return N.a.createElement(ie,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));_.a.render(N.a.createElement(se,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[29,1,2]]]);
//# sourceMappingURL=main.b813483e.chunk.js.map