function SearchSetup() {
    var searchContainers = document.getElementsByClassName("searchContainer");
    for (var containerIndex = 0; containerIndex < searchContainers.length; containerIndex++) {
        var theContainer = searchContainers[containerIndex];
        var inputbox = GetInputBox(theContainer);
        var clearButton = GetCancelButton(theContainer);
        var datalist = GetDatalist(theContainer);
        var searchSuggestions = GetSuggestions(theContainer);

        for (var optionIndex = 0; optionIndex < searchSuggestions.length; optionIndex++) {
            var searchOption = GetOption(theContainer, optionIndex);
            if (searchOption.className != "errorNoElementFound") {
                searchOption.onclick =
                    function (e) {
                        inputbox.value = e.toElement.innerText;
                        inputbox.focus();
                        datalist.style.display = "none";
                    }
            }
        }

        clearButton.onclick =
            function () {
                CancelButtonClick(theContainer);
            }
        inputbox.onkeyup =
            function () {
                if (inputbox.value !== "") {
                    ActivateSearch(theContainer);
                }
                else {
                    CancelButtonClick(theContainer);
                }
            }
    }
}

function GetInputBox(container) {
    return container.getElementsByClassName("searchInputResult")[0];
}

function GetCancelButton(container) {
    return container.getElementsByClassName("searchCancelButton")[0];
}

function GetDatalist(container) {
    return container.getElementsByClassName("searchSuggestion")[0];
}

function GetSuggestions(container) {
    return GetDatalist(container).getElementsByTagName("option");
}

function GetOption(container, index) {
    return GetSuggestions(container)[index];
}

function ActivateSearch(container) {
    var inputbox = GetInputBox(container);
    var clearButton = GetCancelButton(container);
    var datalist = GetDatalist(container);

    clearButton.style.display = "block";
    datalist.style.display = "block";
    datalist.style.top = window.getComputedStyle(inputbox).getPropertyValue("top") + window.getComputedStyle(inputbox).getPropertyValue("height");

    RefreshSuggestion(container);

}

function RefreshSuggestion(container)
{
    var inputbox = GetInputBox(container);
    var datalist = GetDatalist(container);
    var suggestions = GetSuggestions(container);
    var optionNoElementFound = datalist.getElementsByClassName("errorNoElementFound")[0];
    optionNoElementFound.style.display = "none";

    for (var suggestionIndex = 0; suggestionIndex < suggestions.length; suggestionIndex++) {
        var option = GetOption(container, suggestionIndex);
        if (option.className != "errorNoElementFound") {
            if (option.innerText.toString().toLowerCase().includes(inputbox.value.toLowerCase())) {
                option.style.display = "block";
            }
            else {
                option.style.display = "none";
            }
        }
    }

    if (GetVisibleChildren(datalist).length == 0) {
        optionNoElementFound.style.display = "block";
    }
}

function CancelButtonClick(container) {
    var inputbox = GetInputBox(container);
    var clearButton = GetCancelButton(container);
    var datalist = GetDatalist(container);

    inputbox.value = "";
    clearButton.style.display = "none";
    datalist.style.display = "none";
    inputbox.focus();
}

function GetVisibleChildren(element) {
    var visibleChildren = [];
    for (var i = 0; i < element.children.length; i++) {
        if (element.children[i].style.display != "none") {
            visibleChildren.push(element.children[i]);
        }
    }
    return visibleChildren;
}