package cmd

import (
	"log"
	"net/http"
	"time"
)

type Server struct {
	server *http.Server
}

func ServerNew(port string) (*Server, error) {
	mux := SMux()

	serv := &http.Server{
		Addr:         port,
		Handler:      mux,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	server := Server{server: serv}

	return &server, nil
}

func (serv *Server) Close() error {
	return nil
}

func (serv *Server) Start() {
	log.Println("servidor corriendo en host local:", serv.server.Addr)
	log.Fatal(serv.server.ListenAndServe())
}
