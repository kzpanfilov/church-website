export default function DonationsPage() {
  return (
    <div>
      <div className="section-header">
        <h2>Пожертвовать на храм</h2>
        <p>Ваша поддержка помогает сохранять храм и развивать детский центр</p>
        <div className="accent-line" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 1, background: 'var(--border-light)' }}>
        {/* Bank Transfer */}
        <div className="card" style={{ padding: 40 }}>
          <div className="card__label">Банковский перевод</div>
          <h3>Реквизиты храма</h3>
          <div style={{ marginTop: 16, fontSize: '0.88rem', lineHeight: 2, color: 'var(--text-secondary)' }}>
            <p><strong style={{ color: 'var(--text)' }}>Получатель:</strong><br />
              МРО Самарской епархии РПЦ<br />
              (Храм Александра Невского)
            </p>
            <p style={{ marginTop: 12 }}><strong style={{ color: 'var(--text)' }}>ИНН:</strong> 6312056786</p>
            <p><strong style={{ color: 'var(--text)' }}>КПП:</strong> 631201001</p>
            <p><strong style={{ color: 'var(--text)' }}>Расчётный счёт:</strong><br />
              <span style={{ fontFamily: 'monospace', fontSize: '0.95rem' }}>40703810700000000067</span>
            </p>
            <p><strong style={{ color: 'var(--text)' }}>Банк:</strong> ПАО Сбербанк</p>
            <p><strong style={{ color: 'var(--text)' }}>БИК:</strong> <span style={{ fontFamily: 'monospace' }}>043601607</span></p>
            <p><strong style={{ color: 'var(--text)' }}>Корр. счёт:</strong> <span style={{ fontFamily: 'monospace' }}>30101810400000000607</span></p>
          </div>
          <p style={{ marginTop: 16, fontSize: '0.82rem', color: 'var(--text-light)' }}>
            Назначение платежа: «Пожертвование на содержание храма»
          </p>
        </div>

        {/* QR Code */}
        <div className="card" style={{ padding: 40, textAlign: 'center' }}>
          <div className="card__label">QR-код для оплаты</div>
          <h3>Сканируйте в банковском приложении</h3>
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
            <div className="qr-code" style={{ width: 220, height: 220, fontSize: '0.75rem', textAlign: 'center', padding: 16 }}>
              <div>
                <div style={{ fontSize: '3rem', marginBottom: 8 }}>&#9768;</div>
                <div>QR-код будет добавлен</div>
                <div style={{ marginTop: 4, fontSize: '0.7rem' }}>после оформления</div>
                <div style={{ fontSize: '0.7rem' }}>в банке</div>
              </div>
            </div>
          </div>
          <p style={{ marginTop: 20, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Откройте Сбербанк, Тинькофф или другой банк<br />
            и наведите камеру на QR-код
          </p>
        </div>

        {/* Card Transfer */}
        <div className="card" style={{ padding: 40 }}>
          <div className="card__label">Перевод на карту</div>
          <h3>Перевод на карту настоятеля</h3>
          <div style={{ marginTop: 16, fontSize: '0.88rem', lineHeight: 2, color: 'var(--text-secondary)' }}>
            <p><strong style={{ color: 'var(--text)' }}>Протоиерей Владимир Болдырев</strong></p>
            <p style={{ fontFamily: 'monospace', fontSize: '1rem', letterSpacing: 2, marginTop: 8 }}>
              2200 0000 0000 0000
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginTop: 4 }}>
              Сбербанк · СберБанк Онлайн
            </p>
          </div>
          <p style={{ marginTop: 20, fontSize: '0.82rem', color: 'var(--text-light)' }}>
            В комментарии укажите: «Пожертвование на храм»
          </p>
        </div>
      </div>

      <div style={{ marginTop: 48, padding: 32, background: 'var(--bg-warm)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
          «Каждый даёт, как решает сердце его, не с грустью и не с принуждением,
          ибо любящего Бога даёт охотно» <em>(2 Кор. 9:7)</em>
        </p>
        <p style={{ marginTop: 16, fontSize: '0.85rem', color: 'var(--text-light)' }}>
          По всем вопросам обращайтесь: <a href="tel:+78469312071">+7 (846) 931-20-71</a>
        </p>
      </div>
    </div>
  );
}
