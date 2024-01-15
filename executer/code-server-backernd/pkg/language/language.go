package language

import "fmt"

// Language struct
type language struct {
	Name            string
	Id              int
	URL             string
	Script          string
	CodeExtension   string
	OutputExtension string
}

var Languages []language

// Add init languages to the list of languages to populate the list
func AddInitLanguages() {
	
	Languages = append(Languages, language{
		Name:            "javascript",
		Id:              5,
		URL:             "http://codenode:3001/api/v1/recievecode",
		Script:          "node <FILENAME>.<CODE_EXTENSION>",
		CodeExtension:   "js",
		OutputExtension: "",
	})
	fmt.Println(Languages)
}

// Add New Language to the list of languages
func AddNewLanguages(name string, id int, url string, script string, codeExtension string, outputExtension string) {
	Languages = append(Languages, language{
		Name:            name,
		Id:              id,
		URL:             url,
		Script:          script,
		CodeExtension:   codeExtension,
		OutputExtension: outputExtension,
	})
	// add command to create deployment and service
	// then update url accordingly
	// url will be service name only so this will be easy

}

// returns Language URL corresponding to that Language Number
func ParseLanguageNumber(languageNumber int) string {
	for _, lang := range Languages {
		if lang.Id == languageNumber {
			return lang.URL
		}
	}
	return ""
}
