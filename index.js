
      $(document).ready(function () {
        function changeMobileInput(inputId, cCode) {
          var phoneInputID = `#${inputId}`;
          var input = document.querySelector(phoneInputID);
          var iti = window.intlTelInput(input, {
            formatOnDisplay: true,
            geoIpLookup: function (callback) {
              $.get("http://ipinfo.io", function () {}, "jsonp").always(
                function (resp) {
                  var countryCode = resp && resp.country ? resp.country : "";
                  callback(countryCode);
                }
              );
            },
            hiddenInput: "full_number",
            preferredCountries: ["in"],
            separateDialCode: true,
            utilsScript:
              "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.14/js/utils.js",
          });

          $(phoneInputID).on("countrychange", function (event) {
            // Get the selected country data to know which country is selected.
            var selectedCountryData = iti.getSelectedCountryData();

            $("#" + cCode).val(selectedCountryData.dialCode);

            // Get an example number for the selected country to use as placeholder.
            (newPlaceholder = intlTelInputUtils.getExampleNumber(
              selectedCountryData.iso2,
              true,
              intlTelInputUtils.numberFormat.INTERNATIONAL
            )),
              // Convert placeholder as exploitable mask by replacing all 1-9 numbers with 0s

              (mask =
                newPlaceholder[0] == "0"
                  ? newPlaceholder.substring(1)
                  : newPlaceholder);
            mask = mask.replace(/[1-9]/g, "0");
            mask = mask.replaceAll(" ", "-");

            // Apply the new mask for the input
            $(this).mask(mask);
          });

          // When the plugin loads for the first time, we have to trigger the "countrychange" event manually,
          // but after making sure that the plugin is fully loaded by associating handler to the promise of the
          // plugin instance.
          iti.promise.then(function () {
            $(phoneInputID).trigger("countrychange");
          });
        }

        changeMobileInput("phone1", "country-code-1");
        changeMobileInput("phone2", "country-code-2");
        changeMobileInput("phone3", "country-code-3");
      });
    


    
   