                                                                                            nt containMask;
    float invCf;
    float lumaTh;
    float rangeHigh;
    float invWidth;
    float invHeight;
    float opacity;
};

// Derived from https://msdn.microsoft.com/en-us/library/windows/desktop/dd206750(v=vs.85).aspx
// Section: Converting 8-bit YUV to RGB888
static const float3x3 YUVtoRGBCoeffMatrix =
{
	1.164383f,  1.164383f, 1.164383f,
	0.000000f, -0.391762f, 2.017232f,
	1.596027f, -0.812968f, 0.000000f
};

float3 ConvertYUVtoRGB(float3 yuv)
{
	// Derived from https://msdn.microsoft.com/en-us/library/windows/desktop/dd206750(v=vs.85).aspx
	// Section: Converting 8-bit YUV to RGB888

	// These values are calculated from (16 / 255) and (128 / 255)
	yuv -= float3(0.062745f, 0.501960f, 0.501960f);
	yuv = mul(yuv, YUVtoRGBCoeffMatrix);

	return saturate(yuv);
}

min16float4 pixelMain(PixelShaderInput input) : SV_TARGET
{
    float y = luminanceChannel.Sample(defaultSampler, input.texCoord);
    // For D3D11+ cbuffer const if condition branch are optimized away pretty well (verified). 
    // So having the branch here to support no mask case color conversion for free. 
    if (containMask < 0)
    {
        // A, NV12 -> BGRA pre-multiplied.
        float2 uv = chrominanceChannel.Sample(defaultSampler, input.texCoord);
        float a = alphaChannel.Sample(defaultSampler, input.texCoord) * opacity;
        return min16float4(ConvertYUVtoRGB(float3(y, uv)) * a, a);
    }
    else if (containMask > 0)
    {
        float2 coord00 = { input.texCoord.x - invWidth, input.texCoord.y - invHeight };
        float y00 = luminanceChannel.Sample(defaultSampler, coord00);
        float2 coord01 = { input.texCoord.x, input.texCoord.y - invHeight };
        float y01 = luminanceChannel.Sample(defaultSampler, coord01);
        float2 coord02 = { input.texCoord.x + invWidth, input.texCoord.y - invHeight };
        float y02 = luminanceChannel.Sample(defaultSampler, coord02);

        float2 coord10 = { input.texCoord.x - invWidth, input.texCoord.y};
        float y10 = luminanceChannel.Sample(defaultSampler, coord10);
        float2 coord12 = { input.texCoord.x + invWidth, input.texCoord.y};
        float y12 = luminanceChannel.Sample(defaultSampler, coord12);

        float2 coord20 = { input.texCoord.x - invWidth, input.texCoord.y + invHeight };
        float y20 = luminanceChannel.Sample(defaultSampler, coord20);
        float2 coord21 = { input.texCoord.x, input.texCoord.y + invHeight };
        float y21 = luminanceChannel.Sample(defaultSampler, coord21);
        float2 coord22 = { input.texCoord.x + invWidth, input.texCoord.y + invHeight };
        float y22 = luminanceChannel.Sample(defaultSampler, coord22);
        // Erosion
        if (y00 < lumaTh || y01 < lumaTh || y02 < lumaTh ||
            y10 < lumaTh || y < lumaTh || y12 < lumaTh ||
            y20 < lumaTh || y21 < lumaTh || y22 < lumaTh)
        {
            return min16float4(0.0f, 0.0f, 0.0f, 0.0f);
        }

        float2 uv = chrominanceChannel.Sample(defaultSampler, input.texCoord);
        float y1 = rangeHigh - (1 - y) * invCf;
        return min16float4(ConvertYUVtoRGB(float3(y1, uv)) * opacity, opacity);
    }
    else
    {
        float2 uv = chrominanceChannel.Sample(defaultSampler, input.texCoord);
        return min16float4(ConvertYUVtoRGB(float3(y, uv)), 1.0f);
    }

}
    �   ^                  _                                                                                                                                                                                                                                                �18            ��   ��                            ConvertYUVtoRGB                                                                                                                                                                                                                                                                                                                                                 q�Z��Mt�l��pN��2mX��l&��L(�=��5lw�!�M�ιt���Q�E��hԯ�JUw0��(͘8�I�0z���Y�������_~���)�����kS�Q������Va׽�_���0m�����
��%d��=/y��P0M��
l<ͲaԔv9��3Ãy�|?Y��m�c�|�eJO��M\-�E�w�2��8*�'�R�Ӳ`Ђ�;>��1�Ҭw�\�Y�w� qg7B�i����qT�SE��U�P�L��=�ܢ+o���&��F�)|����Mc{�6��܀`�PV��XU���(F���&��6�ߟ���B�s�� ������G~~V��A����*���Q�Xha,]�<	�45�DK�y��A?5�.��B�d�;�iy���������Ѓ=$Ge

�a� ��N�ۿ!��4�_w;��+'wB����(?n_�G�܋�gt����{���gj�^�BR��
�X2�JZ��(~�!xvx���Y�l�����3��� ���B{��j�8��
rɗG��+��;=��5�_��@!AԬIv�cX��I+�g
�_�����-Z��^x��D�^��y)8b[M��x9��յe/��Qب'�'}��Uoے�|AT�N���Z��,��$�� �5O��Q�e�R�_���x�&�����&��N� ����K�h�l*�$�����>Z���?HC������[ꗵ�)�u1�'�V$y?��.�������G/5���K*�|�/gT@�o1�K���7o`�e��Fj`F�!�o���G���h#j"����ԂC��N����?Ztv/����V�ٻ���b�Y��?LhA��U�#%��Ey@*+�<��v]Y��BsSv^:�"�0&�Z�
-��#����MY�7ͥ@�c����.�ϣ���(m��
0g�� ���,�_B���'?�s?\��� �;��zEr��%��q�����gb~\Qo�L�A*;���"ڂ�)����q]���'�W��,�N�/�W-FRS Z�����П��/��k�1�q ���
��c��������[/�ů.���@���Q4HDڏ �A՚aa�[�� \Z�p���J�Ka��T7@��@=��U~�/���E�Z�O v��ŏ٩U�]Ė|���i�8��1b�k�+~�Um�',h�@�\L���[�)��6�� BĦf򷳅C�br�p^�*[u{�C&�*�Up��]&�dٗٳ���GF�J�{�t}/��*�R��Պw�p[�$��Հwz��52@/��R��B�����c�Yc�׀��Qṻӯ�����O�{g���ݼ�ZL1~"��j��W�z� Wr3�\�ӡ��Wu�\H�a�"�*��R	���8���l`��C~c�U�Mm���u��ؗ�{��r��+ WY��{6R"�Y��R>-�o��|��?�����X���u�ٷ�H�����<T!}Ԡ�)~�eW�~ɯ���-��}A�)�(TY�����x��wN��>p�	VӺ;9��{��-�p��f-O�sq������8ɿ9�xƥ���{���x���VѲX�Q�rYh�Ħ������/�}�٪�6b�L :P�f��l}E����I��ꢌ�сJ�Q)7rv x�/�?M�GE-�R���l�?��DQ���g����_�ZZ�o_��׎M�O��p.����7@�Na����-{I'�EQ1�YďG��z�0����˴��t.;�K��A,v�?x{u` ����uE���?_�G;#h�t��{	1YFU�׶onW��2��,���I���.H8�L,%��k�c���U��;Gl�����0H����1zXJ�9t	c|e��]�
��op)
hQx�x�%�w���;g�=�xPX�"8�&���`���!ּ����!�DՌ�S����;ܚ��`CMؒ�_�R��e%a��G`=j*i/��(V��q�*��w�	�*K!�^���,��L��ly�˽��>ݟ���]Y鼡�CPL(�"6�1��T��2��zݦc��p�*���ew����0�h ]����XR��p+�U?��]� !�r�஛�'݅X��DƘ��U{�@�ӿw�{D��5�K'�a���֏�1��5��Uh��{���T]"��G! ��@�sc����ZOwP[DX=���8S*�t���<�#������=Fw��ɽ��������0�q�雉~��fHel6W����]�a��&��S�Q�B�s����e3)�Wa�W���:�x Q�/{3M��׋?��g���`�,1vhP�	#�I���֚�yTcƈ����t#�Jy=90����Az���:L����1�U/O�UTmXٙr�ST=�I��.ޓ��R_��5y�gE)Km|��}�:%	7����n���P���М���\8�6˛莋 G�-�8!�6M�+��W���v* �d~s��~�8��B�&��h�����Zp�9���9�A 'eƿNb�y8��(�I��ღ���8Ƃ��И��{���\;,������gˎj�i��U�pJ����gv�V7��P�i{,�~�r��s����e�ƶv?X1?���Cq#�y�w�.�UT{�	����:�y��&a߆���$�lkqGN��4 ~�C���\�%�1!��|����~����ۯ�5�o�W�,q��%�}�L�T���P?w�����Y��b�~��{�r��Ug�[g/���`92s���ė�G��ʪ/���� �q��LVUw��
��'��x7Nv�g5Y�v��3�6��J��,�<��}��\�M)n
zMt���F����ϞU#�tW��_�W9X�� C5�R8����
pg8��)�bw��W9��/Z�/u�0i���Z��"'1���l�mz|�B
� �FT�f��"\r���û�����#^��t���2D��,�y�x�s�$��v�����7�\g�0%9�H�ˋCyisl3���9�LF��-��aMՐwa@�|EW�}��6
�OK����A�F���ɧ����z�ͪ�UQ
ѕ&%��OZp��)W&j�g$Z���Bڕ+��V\-[/��0�-��L1���8�zɘm� ke3��7���K��֚���¯n�`?��2;��{�����
�wf���V�#M�R}f��R�T׭�<�J���R���΋�F(�gU5��-��F��2R���&b�.����ڙiX�e�X�r�e�Q(a��C��֫�4�0�����t��d�s���E(:&q���А�8aخ(�t-A���D@.mE��.I�,�Dt�����"��9���t/����0�~h�!+�:�K_* �V�q1	��E����e��(�7�X��ķ{�U-��j����e<cj��X��xz+w��Ə�gu�I� �`DeQ��l�fM>�h؎�}:*�)��`�Jv�ƞvZ�W�XM�p���d�p'Y1�>z�Ѥ��+��鲝�X,a�0��b���@��0@p�ҸZ�o�b�g�xC�U����v$'E�G��u���F`.\�k�����[y;>a?�?c�7�$�ώk�i����,�L�'cv=��`�I���LU��P���ěqz���s����UёU��
g�!�k����:���YK!�����k~������0lg�/���J^�4�7�r�A�0�H�p�F�J��k��)s�1*���#�u&�f��ϰK��RH��Xr��5;�l�<���C(��m#�s_@VMҀ"�ӱ�������
�b&P��S|�?ew��Ҍ�����/�:�Q��ڹ�