// SELECT-only source queries. These strings are also used for operator comparison.
export const FIELD_NOTES = `SELECT
 (SELECT COUNT(*) FROM build_log_requests r JOIN build_log_memberships m ON m.id=r.membership_id JOIN subscribers s ON s.id=m.subscriber_id
  WHERE s.email<>?1 AND COALESCE(r.utm_campaign,'') NOT LIKE '%fixture%' AND r.requested_at>=?2 AND r.requested_at<?3) AS build_log_signups,
 (SELECT COUNT(*) FROM (SELECT e.membership_id,MIN(e.created_at) first_at FROM build_log_events e JOIN build_log_memberships m ON m.id=e.membership_id
  JOIN subscribers s ON s.id=m.subscriber_id WHERE e.event='confirmed' AND s.email<>?1
  AND NOT EXISTS(SELECT 1 FROM build_log_requests r WHERE r.membership_id=m.id AND COALESCE(r.utm_campaign,'') LIKE '%fixture%') GROUP BY e.membership_id)
  WHERE first_at>=?2 AND first_at<?3) AS build_log_confirmed,
 (SELECT COUNT(DISTINCT e.membership_id) FROM build_log_events e JOIN build_log_memberships m ON m.id=e.membership_id JOIN subscribers s ON s.id=m.subscriber_id
  WHERE e.event='unsubscribed' AND s.email<>?1 AND e.created_at>=?2 AND e.created_at<?3
  AND NOT EXISTS(SELECT 1 FROM build_log_requests r WHERE r.membership_id=m.id AND COALESCE(r.utm_campaign,'') LIKE '%fixture%')) AS build_log_unsubscribed`
export const RADAR = `SELECT
 (SELECT COUNT(*) FROM (SELECT subscriber_id,MIN(confirmed_at) first_at FROM consents WHERE scope='weekly_digest' AND confirmed_at IS NOT NULL GROUP BY subscriber_id)
  WHERE first_at>=?1 AND first_at<?2) AS digest_confirmed,
 (SELECT COUNT(DISTINCT subscriber_id) FROM trials WHERE started_at>=?1 AND started_at<?2) AS trials_started,
 (SELECT COUNT(*) FROM (SELECT t.subscriber_id,MIN(i.paid_at) first_paid FROM trials t JOIN invoices i ON i.subscriber_id=t.subscriber_id
  WHERE i.amount_paid>0 AND i.paid_at>=t.started_at GROUP BY t.subscriber_id) WHERE first_paid>=?1 AND first_paid<?2) AS trials_converted,
 (SELECT COUNT(DISTINCT s.subscriber_id) FROM subscriptions s WHERE s.status='active' AND s.current_period_end>?2 AND s.unit_amount>0
  AND EXISTS(SELECT 1 FROM invoices i WHERE i.subscriber_id=s.subscriber_id AND i.amount_paid>i.refunded_amount AND i.paid_at<?2)) AS paying_accounts_provisional,
 (SELECT COALESCE(SUM(unit_amount*quantity),0) FROM subscriptions WHERE status='active' AND current_period_end>?2 AND unit_amount>0) AS mrr_minor_provisional,
 (SELECT COALESCE(SUM(amount_paid),0) FROM invoices WHERE currency='cad' AND paid_at>=?1 AND paid_at<?2) AS gross_cash_cad_minor,
 (SELECT COALESCE(SUM(refunded_amount),0) FROM invoices WHERE currency='cad' AND refunded_at>=?1 AND refunded_at<?2) AS refunds_cad_minor_provisional,
 (SELECT COALESCE(SUM(amount_paid),0) FROM invoices WHERE currency='cad' AND paid_at<?2) AS lifetime_collected_cad_minor,
 (SELECT COUNT(*) FROM invoices WHERE currency<>'cad') AS non_cad_invoice_count`
