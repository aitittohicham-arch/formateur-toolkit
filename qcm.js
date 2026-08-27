// =========================================================
// FORMATEUR TOOLKIT
// QCM Generator
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("qcmForm");
    const questionsList = document.getElementById("questionsList");
    const clearButton = document.getElementById("clearQcm");
    const printButton = document.getElementById("printQcm");

    let questions = [];


    // =====================================================
    // AJOUTER UNE QUESTION
    // =====================================================

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const question = {
            text: document.getElementById("question").value.trim(),

            answers: {
                A: document.getElementById("answerA").value.trim(),
                B: document.getElementById("answerB").value.trim(),
                C: document.getElementById("answerC").value.trim(),
                D: document.getElementById("answerD").value.trim()
            },

            correct: document.getElementById("correctAnswer").value
        };


        questions.push(question);

        displayQuestions();

        form.reset();

        document.getElementById("question").focus();

    });


    // =====================================================
    // AFFICHER LES QUESTIONS
    // =====================================================

    function displayQuestions() {

        questionsList.innerHTML = "";

        if (questions.length === 0) {

            questionsList.innerHTML = `
                <div class="tool-card">
                    <p>
                        Aucune question créée pour le moment.
                    </p>
                </div>
            `;

            return;
        }


        questions.forEach((question, index) => {

            const questionCard = document.createElement("article");

            questionCard.className = "tool-card";

            questionCard.innerHTML = `
                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:flex-start;
                    gap:15px;
                    margin-bottom:20px;
                ">

                    <h3>
                        Question ${index + 1}
                    </h3>

                    <button
                        type="button"
                        class="btn btn-secondary delete-question"
                        data-index="${index}"
                    >
                        🗑️
                    </button>

                </div>

                <p>
                    <strong>${escapeHTML(question.text)}</strong>
                </p>

                <div style="display:grid; gap:10px;">

                    <div>
                        <strong>A.</strong>
                        ${escapeHTML(question.answers.A)}
                    </div>

                    <div>
                        <strong>B.</strong>
                        ${escapeHTML(question.answers.B)}
                    </div>

                    <div>
                        <strong>C.</strong>
                        ${escapeHTML(question.answers.C)}
                    </div>

                    <div>
                        <strong>D.</strong>
                        ${escapeHTML(question.answers.D)}
                    </div>

                </div>

                <div style="
                    margin-top:20px;
                    padding:10px;
                    border-radius:10px;
                    background:#eef2ff;
                    color:#4f46e5;
                    font-size:14px;
                    font-weight:700;
                ">
                    ✅ Bonne réponse :
                    ${question.correct}
                </div>
            `;


            questionsList.appendChild(questionCard);

        });


        // =================================================
        // SUPPRESSION D'UNE QUESTION
        // =================================================

        document
            .querySelectorAll(".delete-question")
            .forEach((button) => {

                button.addEventListener("click", () => {

                    const index = Number(button.dataset.index);

                    questions.splice(index, 1);

                    displayQuestions();

                });

            });

    }


    // =====================================================
    // EFFACER TOUT LE QCM
    // =====================================================

    clearButton.addEventListener("click", () => {

        if (questions.length === 0) {
            return;
        }


        const confirmation = confirm(
            "Voulez-vous vraiment supprimer toutes les questions ?"
        );


        if (confirmation) {

            questions = [];

            displayQuestions();

        }

    });


    // =====================================================
    // IMPRIMER LE QCM
    // =====================================================

    printButton.addEventListener("click", () => {

        if (questions.length === 0) {

            alert(
                "Ajoutez au moins une question avant d'imprimer."
            );

            return;
        }


        const printWindow = window.open("", "_blank");


        let html = `
            <!DOCTYPE html>

            <html lang="fr">

            <head>

                <meta charset="UTF-8">

                <title>QCM - Formateur Toolkit</title>

                <style>

                    body {
                        font-family: Arial, sans-serif;
                        max-width: 800px;
                        margin: 40px auto;
                        padding: 20px;
                        color: #172033;
                    }

                    h1 {
                        text-align: center;
                        margin-bottom: 40px;
                    }

                    .question {
                        margin-bottom: 35px;
                        page-break-inside: avoid;
                    }

                    .answers {
                        margin-top: 15px;
                    }

                    .answer {
                        margin: 8px 0;
                    }

                    .footer {
                        margin-top: 50px;
                        text-align: center;
                        color: #777;
                        font-size: 12px;
                    }

                    @media print {

                        body {
                            margin: 20px;
                        }

                    }

                </style>

            </head>

            <body>

                <h1>
                    Questionnaire à choix multiples
                </h1>
        `;


        questions.forEach((question, index) => {

            html += `
                <div class="question">

                    <h3>
                        ${index + 1}. ${escapeHTML(question.text)}
                    </h3>

                    <div class="answers">

                        <div class="answer">
                            ☐ A. ${escapeHTML(question.answers.A)}
                        </div>

                        <div class="answer">
                            ☐ B. ${escapeHTML(question.answers.B)}
                        </div>

                        <div class="answer">
                            ☐ C. ${escapeHTML(question.answers.C)}
                        </div>

                        <div class="answer">
                            ☐ D. ${escapeHTML(question.answers.D)}
                        </div>

                    </div>

                </div>
            `;

        });


        html += `
                <div class="footer">
                    Formateur Toolkit — Projet Open Source
                </div>

            </body>

            </html>
        `;


        printWindow.document.write(html);

        printWindow.document.close();

        printWindow.focus();

        printWindow.print();

    });


    // =====================================================
    // PROTECTION CONTRE L'INJECTION HTML
    // =====================================================

    function escapeHTML(value) {

        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    // =====================================================
    // INITIALISATION
    // =====================================================

    displayQuestions();

});