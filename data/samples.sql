
-- questions avec réponses possibles
SELECT 
    q.question AS "question",
    a.description AS "answer"
FROM
    "question" q
JOIN
    "answer" a
ON 
    q.id = a.question_id
ORDER BY
    q.id ASC
LIMIT 8;



-- questions réponses possibles + bonnes réponses
SELECT 
    q.question AS "question",
    a.description AS "answer",
    ga.description AS "good_answer"
FROM
    "question" q
INNER JOIN "answer" a  ON q.id = a.question_id
INNER JOIN "answer" ga ON q.answer_id = ga.id
ORDER BY
    q.id ASC
LIMIT 12;


-- nom du quiz + questions réponses possibles + bonnes réponses pour un quizz donné
SELECT 
    quiz.title      AS "quiz_title",
    q.question      AS "question",
    a.description   AS "answer",
    ga.description  AS "good_answer"
FROM
    "question" q
INNER JOIN "answer" a   ON q.id = a.question_id
INNER JOIN "answer" ga  ON q.answer_id = ga.id
INNER JOIN "quiz" quiz  ON quiz.id = q.quiz_id
WHERE
    quiz.id = 2
ORDER BY
    q.id ASC;



-- Tous les quiz avec nom, description, auteur
SELECT
    q.title AS "quiz_title",
    q.description AS "quiz_description",
    u.firstname AS "author_firstname",
    u.lastname AS "author_lastname"
FROM
    "quiz" q
INNER JOIN "user" u ON q.user_id = u.id
ORDER BY
    q.title ASC;



-- TECHNIQUE

-- liste des quiz (vue : tous les quiz)
SELECT
    q.id AS "id",
    q.title AS "title",
    q.description AS "description",
    u.firstname AS "author_firstname",
    u.lastname AS "author_lastname"
FROM
    "quiz" q
INNER JOIN "user" u ON q.user_id = u.id
ORDER BY
    q.title ASC;


-- liste des questions pour un quizz donné
SELECT 
    q.id            AS "id",
    q.question      AS "question",
    a.description   AS "answer",
    ga.description  AS "good_answer",
    a.id            AS "answer_id"

FROM
    "question" q
INNER JOIN "answer" a   ON q.id = a.question_id
INNER JOIN "answer" ga  ON q.answer_id = ga.id
WHERE
    q.quiz_id = 3
ORDER BY
    q.id ASC;


-- liste des categories
SELECT * FROM "tag";


-- liste des themes avec categories


-- combien de questions ?
SELECT
    COUNT(*)
FROM 
    question;

-- variante de comptage avec distinct dans la table réponse
SELECT
    COUNT (DISTINCT question_id)
FROM 
    answer;    
