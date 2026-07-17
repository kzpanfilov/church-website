namespace Church.Infrastructure.Data;

public static class SeedData
{
    public static void Initialize(ChurchDbContext context)
    {
        context.Database.EnsureCreated();

        if (context.Pages.Any()) return;

        context.Pages.AddRange(
            new Core.Models.Page
            {
                Slug = "about",
                Title = "О храме",
                Content = @"<h2>Храм в честь благоверного князя Александра Невского</h2>
<p>Храм расположен в посёлке Зубчаниновка города Самары по адресу: ул. Транзитная, 111А.</p>
<h3>История храма</h3>
<p>После того, как в 30-х годах XX века в Зубчаниновке была закрыта и разобрана церковь во имя благоверного князя Александра Невского, посёлок несколько десятилетий оставался без православного храма. Только в середине 90-х годов появилась возможность возрождения в посёлке прерванной традиции храмового богослужения.</p>
<p>6 декабря 1996 года Высокопреосвященнейший Сергий, архиепископ Самарский и Сызранский, совершил молебен на основание нового храма и заложил первый камень в его строительство.</p>
<p>На начальном этапе богослужения проводились в железнодорожном вагоне, переоборудованном под молельный дом. 6 апреля 1997 года в нём состоялась Божественная литургия, которая положила начало духовно-нравственному возрождению посёлка.</p>
<p>Проект храма разработал самарский архитектор Анатолий Иванович Баранников. В 1997 году был заложен фундамент, в 1998 году полностью возведены стены храма. В 2000 году был установлен купол.</p>
<p>12 сентября 2001 года Владыка Сергий совершил освящение храма в честь благоверного князя Александра Невского.</p>
<h3>Престольные праздники</h3>
<ul>
<li>6 декабря — День памяти святого благоверного великого князя Александра Невского</li>
<li>23 сентября / 6 октября — Перенесение мощей благоверного князя Александра Невского из Владимира в Санкт-Петербург</li>
</ul>
<h3>Святыни</h3>
<p>6 декабря 2010 года мощи святого Александра Невского были привезены в Самару из Санкт-Петербурга и остались в Свято-Александровском храме посёлка Зубчаниновка.</p>
<h3>Настоятель</h3>
<p>Протоиерей Владимир Болдырев — настоятель храма с 1993 года, священник-куратор НФ «ДЕОЦ» УФ «Невский».</p>",
                MetaDescription = "Храм в честь благоверного князя Александра Невского в посёлке Зубчаниновка, Самара",
                SortOrder = 1
            },
            new Core.Models.Page
            {
                Slug = "schedule",
                Title = "Расписание богослужений",
                Content = @"<h2>Расписание богослужений</h2>
<div class='schedule-grid'>
<div class='schedule-item'>
<h3>Пятница</h3>
<p><strong>17:00</strong> — Вечернее богослужение</p>
</div>
<div class='schedule-item'>
<h3>Суббота</h3>
<p><strong>17:00</strong> — Всенощное бдение (по указанию настоятеля)</p>
</div>
<div class='schedule-item'>
<h3>Воскресенье</h3>
<p><strong>9:00</strong> — Божественная литургия</p>
<p><strong>17:00</strong> — Акафист</p>
</div>
</div>
<h3>Престольные праздники</h3>
<ul>
<li><strong>6 декабря</strong> — День памяти святого благоверного великого князя Александра Невского</li>
<li><strong>23 сентября (6 октября)</strong> — Перенесение мощей благоверного князя Александра Невского</li>
</ul>
<p>Богослужения в дни великих праздников и престольного праздника уточняйте на дощечке при входе в храм или по телефону.</p>",
                MetaDescription = "Расписание богослужений храма Александра Невского в Зубчаниновке, Самара",
                SortOrder = 2
            },
            new Core.Models.Page
            {
                Slug = "contacts",
                Title = "Контакты",
                Content = @"<h2>Контакты</h2>
<div class='contacts-info'>
<h3>Адрес</h3>
<p>443904, г. Самара, пос. Зубчаниновка, ул. Транзитная, 111А</p>
<h3>Телефоны</h3>
<ul>
<li>Настоятель: <a href='tel:+79022927136'>+7 (902) 292-71-36</a></li>
<li>Храм: <a href='tel:+78469312071'>+7 (846) 931-20-71</a></li>
</ul>
<h3>Проезд</h3>
<p>От Центрального автовокзала Самары (ул. Авроры, 207) на маршрутном такси № 229 ехать в пос. Зубчаниновка. Доехать до остановки «Школа № 98», которая расположена на ул. Чекистов. От остановки пройти около 250 метров по ул. Транзитной. Храм находится с левой стороны за школьной территорией.</p>
<h3>Координаты</h3>
<p>53.25411, 50.33721</p>
<h3>Ссылки</h3>
<ul>
<li><a href='https://xn--d1acwg1ap.xn--p1ai/filialy/23-filialy/174-uchebnyj-filial-nevskij' target='_blank'>Учебный филиал «Невский» (НФ ДЕОЦ)</a></li>
<li><a href='https://vk.com/club217831518' target='_blank'>Группа ВКонтакте</a></li>
<li><a href='https://palomnik63.ru/all_objects/detail/491_aleksandra_nevskogo_blagovernogo_knyazya_samara/' target='_blank'>Страница на Паломнике63</a></li>
</ul>
</div>",
                MetaDescription = "Контакты храма Александра Невского в Зубчаниновке, Самара",
                SortOrder = 3
            },
            new Core.Models.Page
            {
                Slug = "children-center",
                Title = "Детский центр «Невский»",
                Content = @"<h2>Учебный филиал «Невский»</h2>
<p>Учебный филиал «Невский» Некоммерческого фонда «Детский епархиальный образовательный центр» был открыт 1 ноября 2022 года на территории храма в честь благоверного князя Александра Невского.</p>
<h3>Адрес</h3>
<p>г.о. Самара, Зубчаниновка, ул. Транзитная, д. 111А</p>
<h3>Телефон</h3>
<p><a href='tel:+79277594991'>+7 (927) 759-49-91</a></p>
<h3>Руководитель</h3>
<p>Шубина Марина Николаевна</p>
<h3>Священник-куратор</h3>
<p>Протоиерей Владимир Болдырев<br><a href='tel:+79022927136'>+7 (902) 292-71-36</a></p>
<h3>О центре</h3>
<p>Здание, в котором расположился Центр, было построено усилиями настоятеля протоиерея Владимира Болдырева по благословлению митрополита Самарского и Новокуйбышевского Сергия на территории храма святого благоверного князя Александра Невского.</p>
<p>В ноябре 2022 года центр распахнул свои двери для детей. Это просторное, двухэтажное здание. На первом этаже расположились кабинеты для занятий и трапезная. На втором этаже — актовый зал и кабинеты.</p>
<p>В центре открыты объединения художественного, социально-гуманитарного и физкультурно-спортивной направленности.</p>
<h3>Направления</h3>
<ul>
<li>Духовно-просветительская деятельность</li>
<li>Художественное направление</li>
<li>Социально-гуманитарное направление</li>
<li>Физкультурно-спортивное направление</li>
</ul>
<h3>Ссылки</h3>
<ul>
<li><a href='https://xn--d1acwg1ap.xn--p1ai/filialy/23-filialy/174-uchebnyj-filial-nevskij' target='_blank'>Официальная страница филиала «Невский»</a></li>
<li><a href='https://vk.com/club217831518' target='_blank'>Группа ВКонтакте</a></li>
<li><a href='https://xn--d1acwg1ap.xn--p1ai/' target='_blank'>НФ «ДЕОЦ» — официальный сайт</a></li>
</ul>",
                MetaDescription = "Детский епархиальный образовательный центр «Невский» при храме Александра Невского в Зубчаниновке",
                SortOrder = 4
            }
        );

        context.News.AddRange(
            new Core.Models.News
            {
                Title = "Набор в ГКП-группу на базе учебного филиала «Невский»",
                Summary = "Открыт набор детей в группу кратковременного пребывания (ГКП) на базе учебного филиала «Невский» при храме Александра Невского в Зубчаниновке.",
                Content = @"<h2>Набор в ГКП-группу!</h2>
<p>Учебный филиал «Невский» Некоммерческого фонда «Детский епархиальный образовательный центр» объявляет набор детей в <strong>группу кратковременного пребывания (ГКП)</strong>.</p>
<h3>Возраст детей</h3>
<p>От 3 до 7 лет</h3>
<h3>Что предлагает группа</h3>
<ul>
<li>Духовно-нравственное воспитание в православных традициях</li>
<li>Подготовка к школе</li>
<li>Творческие занятия</li>
<li>Развивающие игры</li>
<li>Занятия физкультурой</li>
</ul>
<h3>Как записаться</h3>
<p>Для записи обратитесь по телефону: <a href='tel:+79277594991'>+7 (927) 759-49-91</a></p>
<p>Или посетите филиал лично по адресу: г.о. Самара, Зубчаниновка, ул. Транзитная, д. 111А</p>
<h3>Подробнее</h3>
<p><a href='https://xn--d1acwg1ap.xn--p1ai/filialy/23-filialy/174-uchebnyj-filial-nevskij' target='_blank'>Официальная страница учебного филиала «Невский»</a></p>
<p><a href='https://xn--d1acwg1ap.xn--p1ai/detjam-i-roditeljam/pravila-priema' target='_blank'>Правила приема в НФ «ДЕОЦ»</a></p>",
                IsFeatured = true,
                PublishedAt = DateTime.UtcNow,
                ImageUrl = null
            },
            new Core.Models.News
            {
                Title = "175-летие Самарской епархии",
                Summary = "В 2026 году Самарская епархия отмечает 175-летие со дня основания.",
                Content = "<h2>175-летие Самарской епархии</h2><p>В 2026 году Самарская епархия отмечает знаменательную дату — 175-летие со дня основания.</p>",
                IsFeatured = false,
                PublishedAt = DateTime.UtcNow.AddDays(-30)
            },
            new Core.Models.News
            {
                Title = "Продолжается набор детей в школу на 2026/2027 учебный год",
                Summary = "НФ «ДЕОЦ» продолжает набор детей в учебные филиалы на новый учебный год.",
                Content = "<h2>Набор в НФ «ДЕОЦ» 2026/2027</h2><p>Продолжается набор детей в учебные филиалы Некоммерческого фонда «Детский епархиальный образовательный центр» на 2026/2027 учебный год.</p>",
                IsFeatured = false,
                PublishedAt = DateTime.UtcNow.AddDays(-15)
            }
        );

        context.Announcements.AddRange(
            new Core.Models.Announcement
            {
                Title = "Набор в ГКП-группу на базе филиала «Невский»",
                Content = "Открыт набор детей от 3 до 7 лет в группу кратковременного пребывания. Запись по тел.: +7 (927) 759-49-91",
                LinkUrl = "https://деоц.рф/filialy/23-filialy/174-uchebnyj-filial-nevskij",
                LinkText = "Подробнее",
                IsActive = true,
                SortOrder = 1
            },
            new Core.Models.Announcement
            {
                Title = "Ссылка на сайт детского центра «Невский»",
                Content = "Перейдите на официальный сайт учебного филиала «Невский» для получения подробной информации о занятиях, расписании и условиях записи.",
                LinkUrl = "https://деоц.рф/filialy/23-filialy/174-uchebnyj-filial-nevskij",
                LinkText = "Перейти на сайт",
                IsActive = true,
                SortOrder = 2
            }
        );

        context.SiteSettings.AddRange(
            new Core.Models.SiteSettings { Key = "site_name", Value = "Храм Александра Невского", Description = "Название сайта", Group = "general" },
            new Core.Models.SiteSettings { Key = "church_name", Value = "Храм в честь благоверного князя Александра Невского", Description = "Полное название храма", Group = "general" },
            new Core.Models.SiteSettings { Key = "church_address", Value = "г. Самара, пос. Зубчаниновка, ул. Транзитная, 111А", Description = "Адрес храма", Group = "contacts" },
            new Core.Models.SiteSettings { Key = "church_phone", Value = "+7 (846) 931-20-71", Description = "Телефон храма", Group = "contacts" },
            new Core.Models.SiteSettings { Key = "priest_phone", Value = "+7 (902) 292-71-36", Description = "Телефон настоятеля", Group = "contacts" },
            new Core.Models.SiteSettings { Key = "center_phone", Value = "+7 (927) 759-49-91", Description = "Телефон детского центра", Group = "contacts" },
            new Core.Models.SiteSettings { Key = "center_name", Value = "Учебный филиал «Невский» НФ «ДЕОЦ»", Group = "children" },
            new Core.Models.SiteSettings { Key = "center_url", Value = "https://деоц.рф/filialy/23-filialy/174-uchebnyj-filial-nevskij", Description = "Ссылка на сайт детского центра", Group = "children" },
            new Core.Models.SiteSettings { Key = "center_vk", Value = "https://vk.com/club217831518", Description = "Группа ВК детского центра", Group = "children" },
            new Core.Models.SiteSettings { Key = "latitude", Value = "53.25411", Group = "contacts" },
            new Core.Models.SiteSettings { Key = "longitude", Value = "50.33721", Group = "contacts" }
        );

        // Seed admin user (password: admin123)
        context.AdminUsers.Add(new Core.Models.AdminUser
        {
            Username = "admin",
            PasswordHash = BCryptHelper.HashPassword("admin123"),
            DisplayName = "Администратор",
            IsActive = true
        });

        context.SaveChanges();
    }

    private static class BCryptHelper
    {
        public static string HashPassword(string password)
        {
            using var sha256 = System.Security.Cryptography.SHA256.Create();
            var bytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password + "church_salt_2024"));
            return Convert.ToBase64String(bytes);
        }

        public static bool VerifyPassword(string password, string hash)
        {
            return HashPassword(password) == hash;
        }
    }
}
