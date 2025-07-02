/    Floating-point comparisons are not supported.
//    String comparisons are case-sensitive.
//    Values are converted based on the manifest field type.
//

typedef enum _PAYLOAD_OPERATOR {

    //
    // For integers, comparison can be one of:
    //

    PAYLOADFIELD_EQ = 0,
    PAYLOADFIELD_NE = 1,
    PAYLOADFIELD_LE = 2,
    PAYLOADFIELD_GT = 3,
    PAYLOADFIELD_LT = 4,
    PAYLOADFIELD_GE = 5,
    PAYLOADFIELD_BETWEEN = 6,        // Two values: lower/upper bounds
    PAYLOADFIELD_NOTBETWEEN = 7,     // Two values: lower/upper bounds
    PAYLOADFIELD_MODULO = 8,         // For periodically sampling a field

    //
    // For strings:
    //

    PAYLOADFIELD_CONTAINS      = 20, // Substring identical to Value
    PAYLOADFIELD_DOESNTCONTAIN = 21, // No substring identical to Value

    //
    // For strings or other non-integer values
    //

    PAYLOADFIELD_IS    = 30,         // Field is identical to Value
    PAYLOADFIELD_ISNOT = 31,         // Field is NOT identical to Value
    PAYLOADFIELD_INVALID = 32
} PAYLOAD_OPERATOR;


typedef struct _PAYLOAD_FILTER_PREDICATE {
    LPWSTR FieldName;
    USHORT CompareOp;    // PAYLOAD_OPERATOR
    LPWSTR Value;        // One or two values (i.e., two for BETWEEN operations)
} PAYLOAD_FILTER_PREDICATE, *PPAYLOAD_FILTER_PREDICATE;

#define MAX_PAYLOAD_PREDICATES 8

#if (WINVER >= _WIN32_WINNT_WINBLUE)

TDHAPI
TdhCreatePayloadFilter(
     _In_ LPCGUID ProviderGuid,
     _In_ PCEVENT_DESCRIPTOR EventDescriptor,
     _In_ BOOLEAN EventMatchANY,
     _In_ ULONG PayloadPredicateCount,
     _In_reads_(PayloadPredicateCount)
        PPAYLOAD_FILTER_PREDICATE PayloadPredicates,
     _Outptr_result_maybenull_ PVOID *PayloadFilter
    );

TDHAPI
TdhDeletePayloadFilter(
     _Inout_ PVOID *PayloadFilter
    );

TDHAPI
TdhAggregatePayloadFilters(
    _In_ ULONG PayloadFilterCount,
    _In_reads_(PayloadFilterCount) PVOID *PayloadFilterPtrs,
    _In_reads_opt_(PayloadFilterCount) PBOOLEAN EventMatchALLFlags,
    _Out_ PEVENT_FILTER_DESCRIPTOR EventFilterDescriptor
    );

TDHAPI
TdhCleanupPayloadEventFilterDescriptor(
    _Inout_ PEVENT_FILTER_DESCRIPTOR EventFilterDescriptor
    );

#endif // WINVER

//
// Provider-side filters.
//

typedef struct _PROVIDER_FILTER_INFO {
    UCHAR Id;
    UCHAR Version;
    ULONG MessageOffset;
    ULONG Reserved;
    ULONG PropertyCount;
    _Field_size_(PropertyCount) EVENT_PROPERTY_INFO EventPropertyInfoArray[ANYSIZE_ARRAY];
} PROVIDER_FILTER_INFO, *PPROVIDER_FILTER_INFO;

#endif /* WINAPI_FAMILY_PARTITION(WINAPI_PARTITION_DESKTOP) */
#pragma endregion

#pragma region Desktop Family or OneCore Family
#if WINAPI_FAMILY_PARTITION(WINAPI_PARTITION_DESKTOP | WINAPI_PARTITION_SYSTEM)

// Provider Enumeration.

typedef enum _EVENT_FIELD_TYPE {
    EventKeywordInformation = 0,
    EventLevelInformation,
    EventChannelInformation,
    EventTaskInformation,
    EventOpcodeInformation,
    EventInformationMax
} EVENT_FIELD_TYPE;

typedef struct _PROVIDER_FIELD_INFO {
    ULONG NameOffset;                  // English only.
    ULONG DescriptionOffset;           // Localizable String.
    ULONGLONG Value;
} PROVIDER_FIELD_INFO;
typedef PROVIDER_FIELD_INFO *PPROVIDER_FIELD_INFO;

typedef struct _PROVIDER_FIELD_INFOARRAY {
    ULONG NumberOfElements;
    EVENT_FIELD_TYPE FieldType;
    PROVIDER_FIELD_INFO FieldInfoArray[ANYSIZE_ARRAY];
} PROVIDER_FIELD_INFOARRAY;
typedef PROVIDER_FIELD_INFOARRAY *PPROVIDER_FIELD_INFOARRAY;

typedef struct _TRACE_PROVIDER_INFO {
    GUID ProviderGuid;
    ULONG SchemaSource;
    ULONG ProviderNameOff