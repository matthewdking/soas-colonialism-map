$(document).ready(function() {

    $.cookieBar({
message: "We use cookies on this website. By continuing to use this website you agree to <a class='policy-link' href='/utility/privacy-policy.html'>our privacy policy</a>.",
            acceptButton: true,
            acceptText: "X",
            forceShow: false,
            expireDays: 365,
            effect: "fade",
            element: "body",
 });

    // tabbed content
    // http://www.entheosweb.com/tutorials/css/tabs.asp
    $(".tab_content").hide();
    $(".tab_content:first").show();

    /* if in tab mode */
    $("ul.tabs li").click(function() {

        $(".tab_content").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn();

        $("ul.tabs li").removeClass("active");
        $(this).addClass("active");

        $(".tab_drawer_heading").removeClass("d_active");
        $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");
        //$('#content').css( "height", "auto" );
		
    });
    /* if in drawer mode */
    $(".tab_drawer_heading").click(function() {

        $(".tab_content").hide();
        var d_activeTab = $(this).attr("rel");
        $("#" + d_activeTab).fadeIn();

        $(".tab_drawer_heading").removeClass("d_active");
        $(this).addClass("d_active");

        $("ul.tabs li").removeClass("active");
        $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
    });


    /* Extra class "tab_last" 
    		   to add border to right side
    		   of last tab */
    $('ul.tabs li').last().addClass("tab_last");

    $('#searchbox').click(function() {
        $('#sitesearch').slideToggle();
        $('#mainnav').slideUp();
        $(this).toggleClass("live");
        $('#navmenu').removeClass("live");
    });

    $('#navmenu').click(function() {
        $('#mainnav').slideToggle();
        $('#sitesearch').slideUp();
        $(this).toggleClass("live");
        $('#coursecta').toggleClass("open");
        $('#searchbox').removeClass("live");
    });
    $(window).resize(function() {
        $('#mainnav').css( "display", "" );
        /* $('#sitesearch').css( "display", "" ); */
    });

    $("#first").tinyNav({
        active: 'selected',
        // String: Set the "active" class
        header: 'Sub Navigation',
        // String: Specify text for "header" and show header instead of the active item
        label: '' // String: Sets the <label> text for the <select> (if not set, no label will be added)
    });
    $('article.entry').hide();

    $('h4.expand').css('cursor', 'pointer').click(function() {
        $('article.entry').slideToggle();
        $(this).toggleClass("live");
    });

    $('.country').on('change', function() {
        $('article.entry div').hide();
        $('.' + $(this).val()).show();
    });
    $('#teach h3').css('cursor', 'pointer').click(function() {
        $('#teach-block').slideToggle();
        $(this).toggleClass("live");
        $("#research h3").removeClass("live");
        $('#research-block').slideUp();
    });
    $('#research h3').css('cursor', 'pointer').click(function() {
        $('#research-block').slideToggle();
        $(this).toggleClass("live");
        $("#teach h3").removeClass("live");
        $('#teach-block').slideUp();
    });
    // Sticky A-Z menu //
    if ($("nav#atozmenu").length > 0) {
        var top = $("#atozmenu").offset().top - parseFloat($("#atozmenu").css("marginTop").replace(/auto/, 0));
        $(window).scroll(function(event) {
            var y = $(this).scrollTop();
            if (y >= top) {
                $("#atozmenu").addClass("fixed")
            } else {
                $("#atozmenu").removeClass("fixed")
            }
        })
    }
    // Staff listing show hide //
    if ($("div.departmentstructure").length > 0) {
        var showhtml = "<p class='show departmentstructure'><a href='#'>Show More</a></p>";
        $("div.departmentstructure").attr("style", "display: none");
        $("div.departmentstructure").after(showhtml);
        $("section#content").find("p.departmentstructure").click(function(event) {
            if ($(this).hasClass("hide")) {
                event.preventDefault();
                $(this).addClass("show");
                $(this).removeClass("hide");
                $(this).html("<a href='#'>Show More</a>");
                $(this).prev("div.departmentstructure").slideToggle("slow")
            } else {
                if ($(this).hasClass("show")) {
                    event.preventDefault();
                    $(this).removeClass("show");
                    $(this).addClass("hide");
                    $(this).html("<a href='#'>Hide</a>");
                    $(this).prev("div.departmentstructure").slideToggle("slow")
                }
            }
        })
    }
    // FAQ accordian //
    $(".accordion h5").click(function() {
        $(this).toggleClass("open").next("div").slideToggle("slow");
		$("#content").css('height', 'auto');
        return false
    });
    $("ul.accordion li div").hide();
	
	//If the breadcrumbs break onto two lines shift the sub nav down
    var crumbcount = $("#breadcrumbs ul").children().length;
    	if (crumbcount >= 10) {
    		$("#subnav").addClass("push-down");
    	}
    	
    //If percentage stat is 100 add class
    var statcount = $("#stats dt").text().length;
    	if (statcount > 3) {
    		$("#stats dt").addClass("perfect");
    	}
    
    //If content is shorter than sub nav move the footer down
        
    //$(window).resize(function(){
       //var snav = $("#subnav").height();
       //var bodycont = $("#content").height();
       //if (snav > bodycont ) {
       //$("#content").height(snav);
      // };
   // })
    
    $(window).resize(function longNav(){
    if ( $(window).width() > 767 ) {
        var snav = $("#subnav").height();
       	var bodycont = $("#content").height();
        if(snav > bodycont){
            //$("#content").height(snav);
            $('#content').css( "min-height", snav );
        } else {
            
        }
    } else {
        return false;
    }
});
$(window).resize();
    
});
