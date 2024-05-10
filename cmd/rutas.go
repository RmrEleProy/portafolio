package cmd

import (
	"html/template"
	"net/http"
	"regexp"
)

func templates() *template.Template {
	return template.Must(template.ParseGlob("Vistas/*.html"))
}

func SMux() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("/", cargarTemplates)

	mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))

	return mux
}

var regex_ruta = regexp.MustCompile(`(?i)(\W|^)(index|redes|personales|solar|Curriculum||currenglish|/|)(\W|$)`)

func ruta(ruta string) string {
	m := regex_ruta.FindStringSubmatch(ruta)
	if m == nil {
		return "notfound"
	}
	if m[0] == "/" {
		return "index"
	}
	return m[len(m)-2]
}

func cargarTemplates(w http.ResponseWriter, r *http.Request) {
	templates().ExecuteTemplate(w, ruta(r.URL.Path)+".html", "data")
}
