package queryvariables

import (
	"testing"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

func TestParseVariables(t *testing.T) {
	from := time.Date(2026, 11, 3, 10, 0, 0, 0, time.UTC)
	to := from.Add(time.Hour)
	query := backend.DataQuery{TimeRange: backend.TimeRange{From: from, To: to}}

	iso, _ := ParseVariables(query, map[string]interface{}{}, true)
	if iso["from"] != "2026-11-03T10:00:00Z" || iso["to"] != "2026-11-03T11:00:00Z" {
		t.Errorf("useISODates=true: expected RFC3339, got from=%v to=%v", iso["from"], iso["to"])
	}

	millis, _ := ParseVariables(query, map[string]interface{}{}, false)
	if millis["from"] != from.UnixMilli() || millis["to"] != to.UnixMilli() {
		t.Errorf("useISODates=false: expected unix millis, got from=%v to=%v", millis["from"], millis["to"])
	}
}
