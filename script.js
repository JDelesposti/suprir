import validator from "validator"

document.querySelectorAll(".truck-button").forEach((button) => {
  let isAnimating = false // Variável de controle para verificar se a animação está em andamento
  let isTruckAnimating = false // Variável de controle para verificar se a animação do caminhão está em andamento

  button.addEventListener("click", (e) => {
    e.preventDefault()

    let emailField = document.getElementById("email_field")
    let passwordField = document.getElementById("password_field")

    if (
      !isAnimating &&
      validator.isEmail(emailField.value && passwordField.value)
    ) {
      // Campos preenchidos corretamente
      let box = button.querySelector(".box"),
        truck = button.querySelector(".truck")

      if (!button.classList.contains("done")) {
        if (!button.classList.contains("animation")) {
          isAnimating = true // Define a variável de controle como true

          button.classList.add("animation")

          gsap.to(button, {
            "--box-s": 1,
            "--box-o": 1,
            duration: 0.3,
            delay: 0.5,
          })

          gsap.to(box, {
            x: 0,
            duration: 0.4,
            delay: 0.7,
          })

          gsap.to(button, {
            "--hx": -5,
            "--bx": 50,
            duration: 0.18,
            delay: 0.92,
          })

          gsap.to(box, {
            y: 0,
            duration: 0.1,
            delay: 1.15,
          })

          gsap.set(button, {
            "--truck-y": 0,
            "--truck-y-n": -26,
          })

          gsap.to(button, {
            "--truck-y": 1,
            "--truck-y-n": -25,
            duration: 0.2,
            delay: 1.25,
            onComplete() {
              gsap
                .timeline({
                  onComplete() {
                    button.classList.add("done")
                    isAnimating = false // Define a variável de controle como false ao completar a animação
                  },
                })
                .to(truck, {
                  x: 0,
                  duration: 0.4,
                  onStart() {
                    isTruckAnimating = true // Define a variável de controle como true ao iniciar a animação do caminhão
                  },
                  onComplete() {
                    isTruckAnimating = false // Define a variável de controle como false ao completar a animação do caminhão
                  },
                })
                .to(truck, {
                  x: 40,
                  duration: 1,
                })
                .to(truck, {
                  x: 20,
                  duration: 0.6,
                })
                .to(truck, {
                  x: 96,
                  duration: 0.4,
                })
              gsap.to(button, {
                "--progress": 1,
                duration: 2.4,
                ease: "power2.in",
              })
            },
          })
        }
      } else {
        button.classList.remove("animation", "done", "error")
        gsap.set(truck, {
          x: 4,
        })
        gsap.set(button, {
          "--progress": 0,
          "--hx": 0,
          "--bx": 0,
          "--box-s": 0.5,
          "--box-o": 0,
          "--truck-y": 0,
          "--truck-y-n": -26,
        })
        gsap.set(box, {
          x: -24,
          y: -6,
        })
      }
    } else if (!isAnimating && !isTruckAnimating) {
      // Campos vazios ou incorretos e nem a animação do caminhão está ocorrendo
      button.classList.add("error")
      gsap.fromTo(
        button,
        {
          animation: "shake 1s cubic-bezier(.36,.07,.19,.97) both",
        },
        {
          animation: "none",
          delay: 1,
          onComplete() {
            button.classList.remove("error")
          },
        }
      )
    }
  })
})
