function getQuery(){let url=location.search;let qs=url.substring(url.indexOf('?')+1).split('&');for(var i=0,result={};i<qs.length;i++){qs[i]=qs[i].split('=');result[qs[i][0]]=decodeURIComponent(qs[i][1])}
return result}
function humanFileSize(size){let i=Math.floor(Math.log(size)/Math.log(1024));return(size/Math.pow(1024,i)).toFixed(2)*1+' '+['B','kB','MB','GB','TB'][i]};function buildQuery(){var myRadio=$('input[name=optionsRadios]');var searchOptionRadio=myRadio.filter(':checked').val();var term=$('#term').val();if(typeof(term)!="undefined"&&$.trim(term)!=""){term=$.trim(term);term=term.replace(/ /g,'+')}else{term="*:*"}
term+='~0.8';term+="&fields.label="+searchOptionRadio;term+="&num=10&sort=score.desc";return term.toString().toLowerCase()}
function searchResults(term){term=term.replace(/\(/g,'');term=term.replace(/\)/g,'');term.toString().toLowerCase();var dataUrl="https://www.soas.ac.uk/es-jq-api/json?q="+term;let str="<div>";jQuery.ajax({type:"GET",url:dataUrl,beforeSend:function(){$('.loader').show()},complete:function(){$('.loader').hide()},failure:function(){str+="<p>Sorry, we could not find anything matching your query.</p>";location.href="#search_wrapper"},success:function(result){if(result.response.record_count<1){str+="<p>Sorry, we could not find anything matching your query.</p>"}else if(typeof result.response.result=='undefined'){str+="<p>You have reached the end of your query.</p>"}else{let result_s;if(result.response.record_count==1){result_s='result'}else{result_s='results'}
str+="<p>We found <strong>"+result.response.record_count+" "+result_s+"</strong> matching your query.</p>"
$.each(result.response.result,function(key,value){let pageSize=humanFileSize(value.content_length);str+="<h3><a href=\"https://search.soas.ac.uk/go/?rt="+result.response.requested_time+"&docId="+value.doc_id+"&queryId="+result.response.query_id+"\">"+value.content_title+"</a></h3>";str+="<p>"+value.digest+"</p>";str+="<p class=\"small-url-link\">"+pageSize+' '+value.filetype.toUpperCase()+' | '+value.click_count+' |'+'&nbsp;&nbsp; '+value.url_link+"</p>";str+="</p>"})}
str+="</div>";totalPages=result.response.page_count;$('.page-selection').bootpag({total:totalPages,leaps:!1,firstLastUse:!1,maxVisible:5});for(var i=1;i<10;i++){j=result.response.page_number+i;check='[data-lp='+j+']';if($(check).length){var checkValue=check.substring(check.lastIndexOf("=")+1,check.lastIndexOf("]"));if(checkValue>totalPages){$(check).addClass("disabled")}}}
$("#search_content").html(str);location.href="#search_wrapper"}});return totalPages}
function fromOtherForm(){$(".page-selection").hide();var sq=getQuery();if(typeof sq.q!='undefined'&&sq.q){term=sq.q;$('#term').val(term);term+='~0.8'}else{term="*:*";$('#term').val(term)}
if(typeof sq.more!='undefined'){term+="&fields.label="+sq.more;let thisRadio="input[type=radio][value='"+sq.more.trim()+"']";$(thisRadio).prop("checked",!0)}else{term+="&fields.label=soaswebsite";$("input[name=optionsRadios][value=soaswebsite]").prop("checked",!0)}
if(typeof sq.q!='undefined'||typeof sq.more!='undefined'){term+="&num=10&sort=score.desc";$("#search_content").show();totalPages=searchResults(term.toString().toLowerCase());$('.page-selection').bootpag({total:totalPages,});$("#search_blurb").remove();$("#search_content").show();$(".page-selection").show()}
return totalPages}
var totalPages=1;$(document).ready(function(){$('.loader').hide();$("#search_content").html('<p>&nbsp;</p><p>Please enter your search query.</p>');$('#hit').click(function(){$('.page-selection').empty();$("#search_content").empty();term=buildQuery();totalPages=searchResults(term.toString().toLowerCase());$('.page-selection').bootpag({total:Math.floor(totalPages),page:1,});$("#search_blurb").remove();$("#search_content").show();$(".page-selection").show()});$('#term').keypress(function(e){if(e.which==13){term=buildQuery();totalPages=searchResults(term.toString().toLowerCase());$('.page-selection').bootpag({total:Math.floor(totalPages),page:1,});$("#search_blurb").remove();$("#search_content").show();$(".page-selection").show()}});$("#term").click(function(){$(this).select();$(".radio").show()});totalPages=fromOtherForm();$('.page-selection').bootpag({total:Math.floor(totalPages),maxVisible:1,page:1,firstLastUse:!1,}).on("page",function(event,num){let skip=0;if(num>1){skip=(num*10)-10}
totalPages=searchResults(term.toString().toLowerCase()+'&start='+skip)})})
