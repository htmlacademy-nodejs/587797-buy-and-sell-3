-- Получить список всех категорий (идентификатор, наименование категории);
SELECT category_id, name FROM categories;

-- Получить список категорий для которых создано минимум одно объявление (идентификатор, наименование категории);
SELECT c.category_id, c.name
FROM categories AS c
JOIN offers_categories AS oc
ON c.category_id = oc.category_id
GROUP BY c.category_id;

-- Получить список категорий с количеством объявлений (идентификатор, наименование категории, количество объявлений в категории);
SELECT c.category_id, c.name, COUNT(oc.*)
FROM categories AS c
JOIN offers_categories AS oc
ON c.category_id = oc.category_id
GROUP BY c.category_id;

-- Получить список объявлений (идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие объявления;
SELECT o.offer_id, o.title, o.price, o.description, o.picture, o.created_at as publication_date, u.name, u.surname, u.email,
(SELECT COUNT(*) FROM offers_comments WHERE offer_id = o.offer_id) AS comment_count,
(SELECT string_agg(cat.name, ', ') FROM categories AS cat JOIN offers_categories AS oc ON cat.category_id = oc.category_id WHERE oc.offer_id = o.offer_id) AS categories
FROM offers AS o
JOIN users AS u
ON o.author_id = u.user_id
ORDER BY o.created_at DESC;

-- Получить полную информацию определённого объявления (идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий);
SELECT o.offer_id, o.title, o.price, o.description, o.picture, o.created_at as publication_date, u.name, u.surname, u.email,
(SELECT COUNT(*) FROM offers_comments WHERE offer_id = o.offer_id) AS comment_count,
(SELECT string_agg(cat.name, ', ') FROM categories AS cat JOIN offers_categories AS oc ON cat.category_id = oc.category_id WHERE oc.offer_id = o.offer_id) AS categories
FROM offers AS o
JOIN users AS u
ON o.author_id = u.user_id
WHERE o.offer_id = 436885871;

-- Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария);
SELECT com.comment_id, com.offer_id, u.name, u.surname, com.text
FROM offers_comments AS com
JOIN users AS u
ON com.author_id = u.user_id
ORDER BY com.created_at DESC
LIMIT 5;

-- Получить список комментариев для определённого объявления (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария). Сначала новые комментарии;
SELECT com.comment_id, com.offer_id, u.name, u.surname, com.text
FROM offers_comments AS com
JOIN users AS u
ON com.author_id = u.user_id
WHERE offer_id = 561465857
ORDER BY com.created_at DESC;

-- Выбрать 2 объявления, соответствующих типу «куплю»;
SELECT * FROM offers WHERE type = 1 LIMIT 2;

-- Обновить заголовок определённого объявления на «Уникальное предложение!»;
UPDATE offers SET title='Уникальное предложение!'  WHERE offer_id = 576481439;
