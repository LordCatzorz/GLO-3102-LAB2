function CloseSuggestion(input)
{
    if (input.value == "") {
        input.blur();
        input.focus();
    }
}