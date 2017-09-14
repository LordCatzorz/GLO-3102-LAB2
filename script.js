function SearchSetup(){
    var searchContainers = document.getElementsByClassName("searchContainer");
    for (var containerIndex = 0; containerIndex < searchContainers.length; containerIndex++)
    {
        var theContainer = searchContainers[containerIndex];
        var inputbox = GetInputBox(theContainer);
        var clearButton = GetCancelButton(theContainer);
        var datalist = GetDatalist(theContainer);
        var searchSuggestions = GetSuggestions(theContainer);

        for (var optionIndex = 0; optionIndex < searchSuggestions.length; optionIndex++)
        {
            var searchOption = GetOption(theContainer, optionIndex);
            searchOption.onclick =
                function(e){
                    inputbox.value = e.innerText;
                    inputbox.focus();
                }
        }

        clearButton.onclick =
            function()
            {
                CancelButtonClick(theContainer);
            }
        inputbox.onkeyup =
            function(){
                if (inputbox.value !== "") {
                    ActivateSearch(theContainer);
                }
                else {
                    CancelButtonClick(theContainer);
                }
            }
    }
}

function GetInputBox(container)
{
    return container.getElementsByClassName("searchInputResult")[0];
}
function GetCancelButton(container)
{
    return container.getElementsByClassName("searchCancelButton")[0];
}
function GetDatalist(container)
{
    return container.getElementsByClassName("searchSuggestion")[0];
}

function GetSuggestions(container)
{
    return GetDatalist(container).getElementsByTagName("option");
}

function GetOption(container, index)
{
    return GetSuggestions(container)[index];
}

function ActivateSearch(container)
{
    var inputbox = GetInputBox(container);
    var clearButton = GetCancelButton(container);
    var datalist = GetDatalist(container);


    clearButton.style.display = "block";
    datalist.style.display = "block";

}

function CancelButtonClick(container)
{
    var inputbox = GetInputBox(container);
    var clearButton = GetCancelButton(container);
    var datalist = GetDatalist(container);

    inputbox.value = "";
    clearButton.style.display = "none";
    datalist.style.display = "none";
    inputbox.focus();
}
