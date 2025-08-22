const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для статических файлов
app.use(express.static(path.join(__dirname)));

// Middleware для парсинга JSON
app.use(express.json());

// Middleware для логирования запросов
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Страница меню
app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'menu.html'));
});

// Страница отзывов
app.get('/reviews', (req, res) => {
    res.sendFile(path.join(__dirname, 'reviews.html'));
});

// API для получения данных о филиалах
app.get('/api/branches', (req, res) => {
    const branches = [
        {
            id: 1,
            name: 'KONO Центр',
            address: 'ул. Главная, 123',
            coordinates: [55.7558, 37.6176]
        },
        {
            id: 2,
            name: 'KONO Север',
            address: 'пр. Северный, 45',
            coordinates: [55.8358, 37.6176]
        },
        {
            id: 3,
            name: 'KONO Юг',
            address: 'ул. Южная, 67',
            coordinates: [55.6758, 37.6176]
        },
        {
            id: 4,
            name: 'KONO Запад',
            address: 'ул. Западная, 89',
            coordinates: [55.7558, 37.5176]
        },
        {
            id: 5,
            name: 'KONO Восток',
            address: 'пр. Восточный, 12',
            coordinates: [55.7558, 37.7176]
        }
    ];
    
    res.json(branches);
});

// API для получения отзывов
app.get('/api/reviews/:branchId', (req, res) => {
    const branchId = parseInt(req.params.branchId);
    
    // Заглушка для отзывов (в реальном проекте здесь была бы база данных)
    const reviews = {
        1: [
            {
                id: 1,
                name: 'Анна',
                rating: 5,
                text: 'Отличный ресторан! Блюда очень вкусные, атмосфера уютная. Обязательно вернусь снова!',
                date: '2 дня назад'
            },
            {
                id: 2,
                name: 'Дмитрий',
                rating: 4,
                text: 'Хорошая еда, быстрое обслуживание. Цены приемлемые для такого качества.',
                date: '1 неделю назад'
            }
        ],
        2: [
            {
                id: 3,
                name: 'Михаил',
                rating: 4,
                text: 'Хорошая еда, но долго готовили. Персонал вежливый, порции большие.',
                date: '1 неделю назад'
            }
        ],
        3: [
            {
                id: 4,
                name: 'Елена',
                rating: 5,
                text: 'Потрясающий рамен! Самый вкусный в городе. Атмосфера как в Японии.',
                date: '2 недели назад'
            },
            {
                id: 5,
                name: 'Сергей',
                rating: 5,
                text: 'Отличное место для семейного ужина. Дети в восторге от персонажей!',
                date: '3 недели назад'
            }
        ],
        4: [],
        5: []
    };
    
    res.json(reviews[branchId] || []);
});

// API для добавления отзыва
app.post('/api/reviews', (req, res) => {
    const { name, rating, text, branchId } = req.body;
    
    // Валидация данных
    if (!name || !rating || !text || !branchId) {
        return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
    }
    
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Рейтинг должен быть от 1 до 5' });
    }
    
    // В реальном проекте здесь был бы код для сохранения в базу данных
    console.log('Новый отзыв:', { name, rating, text, branchId, date: new Date() });
    
    res.json({ 
        success: true, 
        message: 'Отзыв успешно добавлен',
        review: {
            id: Date.now(),
            name,
            rating,
            text,
            date: 'Только что'
        }
    });
});

// API для получения статистики чаевых
app.get('/api/tips/stats', (req, res) => {
    // Заглушка для статистики
    const stats = {
        totalAmount: 12450,
        totalPeople: 247,
        totalBranches: 5,
        recentTips: [
            { amount: 500, branch: 'KONO Центр', date: '2 часа назад' },
            { amount: 200, branch: 'KONO Юг', date: '1 день назад' },
            { amount: 1000, branch: 'KONO Север', date: '2 дня назад' }
        ]
    };
    
    res.json(stats);
});

// Обработка 404 ошибок
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Обработка ошибок сервера
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 KONO сервер запущен на порту ${PORT}`);
    console.log(`🌐 Откройте http://localhost:${PORT} в браузере`);
    console.log(`📱 Сайт готов к использованию!`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM получен, закрываем сервер...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT получен, закрываем сервер...');
    process.exit(0);
});
