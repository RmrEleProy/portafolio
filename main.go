package main

import (
	"log"
	"os"
	"os/signal"

	"github.com/RmrEleProy/portafolio/cmd"
)

func main() {
	serv, err := cmd.ServerNew(":8080")
	if err != nil {
		log.Fatal(err)
	}

	go serv.Start()

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	<-c

	serv.Close()
}
