
function main() {

function getFormattedDate(eventDate) {
  let date = new Date(eventDate);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday"];
  return weekDays[date.getUTCDay()] + ", " + monthNames[date.getUTCMonth()] + " " + date.getUTCDate() + ", " + date.getUTCFullYear();
}

function getFormattedTime(eventTime) {
  let date = new Date(eventTime);

   let isPMTime = date.getHours() > 12;
   return (date.getHours() > 12 ? (date.getHours() - 12) : date.getHours()) + ":" + 
   (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes) + (isPMTime ? " PM" : " AM");
}

(function () {
   'use strict';

    let upcomingEvent;

    $.ajax({
      url: "https://us-central1-tech4hood.cloudfunctions.net/getEvents",
      type: "GET"
    }).done(function(data) {
      if (data && data.upcomingEvents.length > 0) {
        $("#events").show();

        upcomingEvent = data.upcomingEvents[0];

        $(".event-title").text(upcomingEvent.name);

        if (upcomingEvent.venue) {
          $(".event-place").text(upcomingEvent.venue.name);
          $(".event-qrcode").attr('src', 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + upcomingEvent.link);
          $(".event-date").text(getFormattedDate(upcomingEvent.local_date));
          $(".event-time").text(getFormattedTime(upcomingEvent.local_date + " " + upcomingEvent.local_time));
          $(".event-location").text(upcomingEvent.venue.address_1);
          $(".event-city").text(upcomingEvent.venue.city + ", " + upcomingEvent.venue.localized_country_name);
        }
      }
    });

    $(".event-registration-btn").click(function() {
      window.open(upcomingEvent.link, 'target=_blank');
    });

	// Hide .navbar first
	$(".navbar").hide();
	
	// Fade in .navbar
	$(function () {
		$(window).scroll(function () {
            // set distance user needs to scroll before we fadeIn navbar
			if ($(this).scrollTop() > 200) {
				$('.navbar').fadeIn();
			} else {
				$('.navbar').fadeOut();
			}
		});

	
	});
	
	// Preloader */
	  	$(window).load(function() {

   	// will first fade out the loading animation 
    	$("#status").fadeOut("slow"); 

    	// will fade out the whole DIV that covers the website. 
    	$("#preloader").delay(500).fadeOut("slow").remove();      

  	}) 

   // Page scroll
  	$('a.page-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 40
            }, 900);
            return false;
          }
        }
      });

    // Show Menu on Book
    $(window).bind('scroll', function() {
        var navHeight = $(window).height() - 100;
        if ($(window).scrollTop() > navHeight) {
            $('.navbar-default').addClass('on');
        } else {
            $('.navbar-default').removeClass('on');
        }
    });

    $('body').scrollspy({ 
        target: '.navbar-default',
        offset: 80
    })

  	$(document).ready(function() {
  	    $("#testimonial").owlCarousel({
        navigation : false, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true
        });

    });
  // jQuery Parallax
  function initParallax() {
    $('#intro').parallax("100%", 0.3);
    $('#services').parallax("100%", 0.3);
    $('#aboutimg').parallax("100%", 0.3);	
    $('#testimonials').parallax("100%", 0.1);

  }
  initParallax();

  	// Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});	

}());


}
main();