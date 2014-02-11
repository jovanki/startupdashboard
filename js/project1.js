
$(document).ready(function() {
	
	// when user clicks, get company name
	$('#getCompanyName').click(function() {
		  event.preventDefault();
		$('#jobsCanvas').html('');
		var companyName = $('#companyName').val();
	    // console.log(companyName);
	    // Make a call to the  API to get data
	    $.ajax({
				type: "GET",    	
				    // crunchbase look up company profile
					// url: 'http://api.crunchbase.com/v/1/company/' + companyName + '.js?api_key=t64qktqmy2s3hyq6g3g5cazf',
					url: 'http://jsonp.jit.su/?url=http%3A%2F%2Fapi.crunchbase.com%2Fv%2F1%2Fcompany%2F' + companyName + '.js%3Fapi_key%3Dt64qktqmy2s3hyq6g3g5cazf',
					dataType: "jsonp",
					error: function(jqXHR, textStatus, errorThrown) {
						if (jqXHR.status === 404){
							$('#companyTitle').html('This company is not yet in our database.');
						} else if (jqXHR.status === 400) {
							$('#companyTitle').html('This company is not yet in our database.');
						} else {
							$('#companyTitle').html('The server is not responding, please try again later.');
						}
					},
		            success: function(theCompany) {
		            	// console.log(theCompany);
		            	displayCompanyProfile(theCompany);
		            	googleTrends(companyName);
		            	getJobs(companyName);
		            }
	        });


		function displayCompanyProfile(theCompany) {
			$('#companyTitle').html(theCompany.name);

			if (theCompany.description) {
				$('#companySummary').html(theCompany.description);;
			} else {
				$('#companySummary').html('-');
			}


			if (theCompany.overview) {
				$('#companyDescription').html(theCompany.overview);
			} else {
				$('#companyDescription').html('-');
			}

			if (theCompany.tag_list) {
				$('#companySector').html('Tags: ' + theCompany.tag_list);
			} else {
				$('#companySector').html('Tags: -');
			}


			if (theCompany.offices[0].city) {
				$('#companyLocation').html('Location: ' + theCompany.offices[0].city);
			} else {
				$('#companyLocation').html('Location: -');
			}

		
			if (theCompany.founded_year) {
				$('#companyFounded').html('Founded: ' + theCompany.founded_year);
			} else {
				$('#companyFounded').html('Founded: -');
			}


			if (theCompany.number_of_employees) {
				$('#companyEmployees').html('Employees: ' + theCompany.number_of_employees);
			} else {
				$('#companyEmployees').html('Employees: -');
			}

			if (theCompany.total_money_raised) {
				$('#companyFunding').html('Funding: ' + theCompany.total_money_raised);
			} else {
				$('#companyFunding').html('Funding: -');
			}

			if (theCompany.homepage_url) {
				$('#companyURL').html('Website: ' + theCompany.homepage_url);
			} else {
				$('#companyURL').html('Website: -');
			}

			// $('#companyConnections').html();   // add LinkedIn if time
		}
				


//WIP: improve google trends charts by drawing own map using table
	    // var googleTrends = 'http://www.google.com/trends/fetchComponent?q=' + companyName + '&cid=TIMESERIES_GRAPH_0&export=3';
	    // 	console.log(googleTrends);
	    function googleTrends(companyName){

	    	var trendsChart = "<iframe style='height: 330px; width: 500px;' src='http://www.google.com/trends/fetchComponent?q=" + companyName + "&cid=TIMESERIES_GRAPH_0&export=5'></iframe>";
	    	$('#googleTrendsCanvas').html(trendsChart);
	    }


	    function getJobs(companyName) {
		    // Make a call to the Adzuna API to get jobs data
		    $.ajax({
					type: "GET",    	
						// adzuna request job list by company name
						url: 'http://jsonp.jit.su/?url=http%3A%2F%2Fapi.adzuna.com%3A80%2Fv1%2Fapi%2Fjobs%2Fgb%2Fsearch%2F1%3Fapp_id%3D15020c9a%26app_key%3D1815c85db70a2acdfcc2695cd24dbbd7%26company%3D' + companyName,
						error: function(jqXHR, textStatus, errorThrown) {
							if (jqXHR.status === 404){
								$('#jobsCanvas').html('No jobs were found for this company. Our jobs database currently holds jobs in the UK only. Please check back soon.');
							} else if (jqXHR.status === 400) {
								$('#jobsCanvas').html('No jobs were found for this company. Our jobs database currently holds jobs in the UK only. Please check back soon.');
							} else {
								$('#jobsCanvas').html('Unfortunately the server is having troubles, please try again later.');
							}
						},
			            success: function(theJobs) {
			            
				            function jobsTable(theJobs){
				            	for (var i in theJobs.results) {
									var jobTitle = theJobs.results[i].title;

									$('#jobsCanvas').append(jobTitle + '<br>');
				            	}
				            }
				            jobsTable(theJobs);
			            }
		        });

	    }


	});
});








					// angellist lookup ID by looking for exact URL:
						// url: 'https://api.angel.co/1/search/slugs?query=' + companyName,
						// dataType: "jsonp",
						
						// or to return list of results by name of startup:
			            // url: 'https://api.angel.co/1/search?query=' + companyName + '&type=Startup',


			            // var startupId
						// angellist look up profile with id
						// url: 'https://api.angel.co/1/tags/' + startupId + '/startups'
						// dataType: "jsonp",

						
						// dataType: "jsonp",

			            // success: function (xml) {
			            //     alert(xml.data[0].city);
			            //     result = xml.code;
			            //     document.myform.result1.value = result;
			            // },


    		// url: 'https://api.angel.co/1/search?query=' + companyName + '&type=Startup',
	    	// url: 'http://api.crunchbase.com/v/1/company/' + companyName + '.js?api_key=t64qktqmy2s3hyq6g3g5cazf',

