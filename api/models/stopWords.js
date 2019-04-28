/**
 * This JS file contains a list of stop words which are needed in filtering word mechanism in annotatorApplication.js
 * You can insert new words as you wish, but PLEASE MAINTAIN THE ALPHABEICAL ORDER and the program will discard those words from searching.
 * The list take the data structure of an JS Array.
 * The stop words are arranged in a alphabetical order for ease of human reading. 
 * Ex. "and", "or", "one", "two", "here" etc.
 * The list will be imported at the end.
 */

// PLEASE MAINTAIN THE ALPHABEICAL ORDER!!!

const stopWordsArray = [
    "a", "above", "after", "against", "all", "alone", "always", "am", "amount", "an", "and", "any", "are", "around", "as", "at", 
    "back", "be", "before", "behind", "below", "between", "bill", "both", "bottom", "but", "by", 
    "call", "can", "co", "con", 
    "de", "detail", "do", "done", "down", "due", "during", 
    "each", "eg", "eight", "eleven", "empty", "ever", "every", 
    "few", "fill", "find", "fire", "first", "five", "for", "former", "found", "four", "from", "front", "full", "further", 
    "get", "give", "go", 
    "had", "has", "hasnt", "he", "her", "hers", "him", "his", 
    "I", "i", "ie", "if", "in", "into", "is", "it", 
    "last", "less", "ltd", 
    "many", "may", "me", "mill", "mine", "more", "most", "mostly", "must", "my", 
    "name", "next", "nine", "no", "none", "nor", "not", "nothing", "now", 
    "of", "off", "often", "on", "once", "one", "only", "or", "other", "others", "out", "over", 
    "part", "per", "put", 
    "re", 
    "same", "see", "serious", "several", "she", "show", "side", "since", "six", "so", "some", "sometimes", "still", 
    "take", "ten", "the", "then", "third", "this", "thick", "thin", "three", "through", "to", "together", "top", "toward", "towards", "twelve", "two", 
    "un", "under", "until", "up", "upon", "us", 
    "very", "via", 
    "was", "we", "well", "when", "which", "while", "who", "whole", "will", "with", "within", "without", 
    "you", "yourself", "yourselves"
];

module.exports.StopWordsList = stopWordsArray; //exports the JS array to the application