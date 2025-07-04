cument
    <https://html.spec.whatwg.org/multipage/dom.html#global-attributes>`__. ::

        attrs = {'asdf': 'table'}

    is *not* a valid attribute dictionary because 'asdf' is not a valid
    HTML attribute even if it is a valid XML attribute.  Valid HTML 4.01
    table attributes can be found `here
    <http://www.w3.org/TR/REC-html40/struct/tables.html#h-11.2>`__. A
    working draft of the HTML 5 spec can be found `here
    <https://html.spec.whatwg.org/multipage/tables.html>`__. It contains the
    latest information on table attributes for the modern web.

parse_dates : bool, optional
    See :func:`~read_csv` for more details.

thousands : str, optional
    Separator to use to parse thousands. Defaults to ``','``.

encoding : str, optional
    The encoding used to decode the web page. Defaults to ``None``.``None``
    preserves the previous encoding behavior, which depends on the
    underlying parser library (e.g., the parser library will try to use
    the encoding provided by the document).

decimal : str, default '.'
    Character to recognize as decimal point (e.g. use ',' for European
    data).

converters : dict, default None
    Dict of functions for converting values in certain columns. Keys can
    either be integers or column labels, values are functions that take one
    input argument, the cell (not column) content, and return the
    transformed content.

na_values : iterable, default None
    Custom NA values.

keep_default_na : bool, default True
    If na_values are specified and keep_default_na is False the default NaN
    values are overridden, otherwise they're appended to.

displayed_only : bool, default True
    Whether elements with "display: none" should be parsed.

extract_links : {None, "all", "header", "body", "footer"}
    Table elements in the specified section(s) with <a> tags will have their
    href extracted.

    .. versionadded:: 1.5.0

dtype_backend : {'numpy_nullable', 'pyarrow'}, default 'numpy_nullable'
    Back-end data type applied to the resultant :class:`DataFrame`
    (still experimental). Behaviour is as follows:

    * ``"numpy_nullable"``: returns nullable-dtype-backed :class:`DataFrame`
      (default).
    * ``"pyarrow"``: returns pyarrow-backed nullable :class:`ArrowDtype`
      DataFrame.

    .. versionadded:: 2.0

storage_options : dict, optional
    Extra options that make sense for a particular storage connection, e.g.
    host, port, username, password, etc. For HTTP(S) URLs the key-value pairs
    are forwarded to ``urllib.request.Request`` as header options. For other
    URLs (e.g. starting with "s3://", and "gcs://") the key-value pairs are
    forwarded to ``fsspec.open``. Please see ``fsspec`` and ``urllib`` for more
    details, and for more examples on storage options refer `here
    <https://pandas.pydata.org/docs/user_guide/io.html?
    highlight=storage_options#reading-writing-remote-files>`_.

    .. versionadded:: 2.1.0

Returns
-------
dfs
    A list of DataFrames.

See Also
--------
read_csv : Read a comma-separated values (csv) file into DataFrame.

Notes
-----
Before using this function you should read the :ref:`gotchas about the
HTML parsing libraries <io.html.gotchas>`.

Expect to do some cleanup after you call this function. For example, you
might need to manually assign column names if the column names are
converted to NaN when you pass the `header=0` argument. We try to assume as
little as possible about the structure of the table and push the
idiosyncrasies of the HTML contained in the table to the user.

This function searches for ``<table>`` elements and only for ``<tr>``
and ``<th>`` rows and ``<td>`` elements within each ``<tr>`` or ``<th>``
element in the table. ``<td>`` stands for "table data". This function
attempts to properly handle ``colspan`` and ``rowspan`` attributes.
If the function has a ``<thead>`` argument, it is used to construct
the header, otherwise the function attempts to find the header within
the body (by putting rows with only ``<th>`` elements into the header).

Similar to :func:`~read_csv` the `header` argument is applied
**after** `skiprows` is applied.

This function will *always* return a list of :class:`DataFrame` *or*
it will fail, e.g., it will *not* return an empty list.

Examples
--------
See the :ref:`read_html documentation in the IO section of the docs
<io.read_html>` for some examples of reading in HTML tables.
    """
    pass
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         W�  SPpSER IALIZEVE RBOSE: S erializi ng opera tion: Ex ecute pr0ovis $>mig>
2025 -05-31 1 4:25:51,� Info�	
-z Start su spended  servicesZtGather �8 instal�l, sc � ���@YTHING�@M�e frame work (Fu�ll)b:boo�\xett�y?Z�ZOp��al Com ponen�tatu?Apply �����Crea �regist ry key H KLM\SOFT WARE\Mic rosoft\W indows\C�urr�FVer�� \Setup\O OBE (val�ue n��:��B� Type) on �� new s�ystemH2�u��mou�5dat a to C:\ $WINDOWS .~BT\Sou*r�u\�p�js.@�h�+���:vSafeOS\� .M�War�na��@PU��it"�eNet�s�: N�frun�in �6 PE;� will n��A=�$u�`3_"�$OPERATI�ONTRACK NewS�< Re`lease�
�
M OUPG  MoBKPlatform �
objecۀsű!�� ���r�d�� �D!� Id�gifi ��-> [D Vì �&] S�"An�dcAHb) �) #�...%O��
�and �$�sa�� p$6_�Ex�H	�CV@gom T	0me+: [K KyHGjnhO EWv1/gA.�999.20_��D�DInput� `t1so9�}is dif�fe�R , e��:5Clo"s�Panr�Lo�gg� ���@5�5��5�!6͕�
d0<?OA_6�?;Ac�!{�gress��100%�!t` !�
Task�55�1�/	�tOv ��VP�5	64��dCa �Mapp��G�lobP����	D�F: Leav%��Method/%%_/�
C�Di agnostic s::Repor�t -Si��y�LP �zpoip{�[0x2004��7` D��r�;���3�O#�Pr�oBH�Pler�(��nd�fin�$ m *ag�or� a�+[2]?X����@�F�Up�(e:  ,@ 64� /b � ��B�e#�ebuggerC�P6Int�ATarget:'
  [~C�O�p}D�T 1��[N`��߯���i�@�n [3�T=�2T�*�*�*���*2oon5�Ent�����?@�^@���Fe�!"A�enabled�.
� 025-05-3 1 14:25: 52, Info  MOUPG   Debugge rOptions : Leavin g Execut e Method
2�WarnX�ZCSetu pDiagnos tics::Re portData  - Not rBWINDLP dpoint  [0x2004]w{3�=�Pro gressHan@dlerAc��:  Sendtfi nal p m�age for a [3].�z/< F�Up V�e: 0x3, �0 /A�se�iz�InitializA7Dev ice scan! wsult��[C:\$xOWS. ~BT\Sour ces\Pant her\S�ReaA.xmlt]�$M	�'gaa fil epath: [?�=rive l@etter:��[CJFullU`pgrad�]FT�RUE?
Mi�5�d�r@8�[0Ͽ�� �Pr�E�� instal`b�#3�EDc	Uc reflect �Bt\R�o�m@ Te�Ye���F6��nv�08\F6���Un�a�gnd� �����TargetFw_id�y��_P��O obe Regihstrc�P�`C	[�B�H�.ex�>��:���Arg0umen�Z [/SucpZs / Media /Cli�Id Wi n10UA:VN L:URL::< 1.4.1904�1.5003>  >:{C93F4 418-EC40 -41A1-84 EA-BCED3 6CF14DE}@:[10.0�3�]:[2] /��p1bc3b67 7-367e-4 546-9de1 -b5478fd�c6a0_I��x|OnlineR�ollback���co��B����� SyuX/�	 ���������� /Quiet�:��'///�+ �Us�w[&!??�????????_�� 6��n��i���ߦ٦4ߦ4�1ߤ�����2�!�!�Q3 f(�En0���o/�_9_9� ��Qs!�� com��ib ility� ntr�Aer. WoDrkadir�o0ry: �t�. �Log D���/���i� ConX�::C�
� �  � ::Impl::Load��vid
eA�I��scen�ario: 1�g���:C�r::�TCorrel��oV�!,tt�� � [KKyH GjnhOEWv 1/gA.999p.22.�`�`�
 : �y�x�
ct�o��


1/
_�
/
t/
@�::�� SetCorre lationVe@ctor: � L [KKyHG jnhOEWv1 /gA.999. 22.2.0] 
2025-05 -31 14:2 5:52, Info  ConX@::Comp zb`ility 
H�ost::?�34� This  no t a conn��ed stan d by devhice�~D�'��D atabase: :Import:" �ing?s  from C:\ $WINDOWS .~BT\Sou rces\hwc��64.txt ...�WFileAe'does �[e�xist*ƕVWV�UJ|@�+Q+exc�lude?� �v� WA�?A?�2�_l�ol�_A������du�����N�:A�AApIsDr iverBoot Critical : Start  type of ser����orn�vme: 0��۷��	#:L��`�n�aliz�Dete��b�-c���  (ClassGu id = {4d 36e97b-e3��11ce-b fc1-0800 2be10318}, ScName�s`�!):  pci\ven_ 1cc1&Pl_4 1c8&su